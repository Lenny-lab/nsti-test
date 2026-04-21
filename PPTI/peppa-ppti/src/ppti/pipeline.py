from __future__ import annotations

import json
import re
import shutil
import unicodedata
from concurrent.futures import ThreadPoolExecutor, as_completed
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

import cloudscraper
import requests
from bs4 import BeautifulSoup


APP_ROOT = Path(__file__).resolve().parents[2]
LEGACY_ROOT = APP_ROOT.parent
RAW_DIR = APP_ROOT / "data" / "raw"
PROCESSED_DIR = APP_ROOT / "data" / "processed"
DIST_DIR = APP_ROOT / "dist"
WEB_DIR = APP_ROOT / "web"

FANDOM_LIST_URL = "https://peppapig.fandom.com/wiki/List_of_Characters"
BUZZFEED_URL = "https://www.buzzfeed.com/sespracklen/which-peppa-pig-character-are-you-rnefa3hlb"

SECTION_PRIORITY = (
    "Personality",
    "Biography",
    "Bio",
    "About",
    "Nick_Jr.com_description",
    "Nick Jr.com description",
    "Nick Jr./Noggin description",
)
IGNORED_LINK_PREFIXES = (
    "/wiki/List",
    "/wiki/File:",
    "/wiki/Template:",
    "/wiki/Category:",
    "/wiki/Special:",
    "/wiki/Help:",
)
IGNORED_LINK_TEXT = {
    "List of Characters",
    "Gallery",
    "Trivia",
    "Quotes",
    "Contents",
}

TRAIT_PATTERNS = {
    "kind": ("kind", "kindhearted", "kind-hearted", "gentle"),
    "caring": ("caring", "supportive", "helpful", "motherly"),
    "friendly": ("friendly", "inclusive", "well-meaning", "generous"),
    "cheerful": ("cheerful", "happy", "positive", "bubbly"),
    "energetic": ("energetic", "hyperactive", "lively"),
    "playful": ("playful", "fun-loving", "play", "dress-up"),
    "curious": ("curious", "interested in", "keen to"),
    "smart": ("smart", "intelligent", "wise", "witty"),
    "responsible": ("responsible", "mature", "proactive"),
    "brave": ("brave", "confident", "bold"),
    "bossy": ("bossy", "likes to take control", "tell people what to do"),
    "loud": ("loud", "noisy"),
    "shy": ("shy", "blushes", "face turns red"),
    "funny": ("humor", "funny", "makes people laugh"),
    "calm": ("calm", "relax", "relaxing"),
    "creative": ("creative", "talent", "make", "craft"),
    "sporty": ("sports", "running race", "gym class", "swimming"),
    "stubborn": ("stubborn", "refuses", "won't"),
    "clumsy": ("clumsy", "slips", "tripping", "fell"),
    "absent-minded": ("absent-minded", "forgetful"),
    "lazy": ("lazy",),
    "emotional": ("emotional", "temper", "cries"),
}

DIMENSIONS = [
    {
        "id": "spark",
        "name": "泥坑活力",
        "left_label": "慢热观察派",
        "right_label": "一踩就跳派",
        "summary": "看你更像先看看情况，还是一见到好玩的事就立刻冲上去。",
    },
    {
        "id": "heart",
        "name": "朋友相处感",
        "left_label": "自己节奏派",
        "right_label": "贴心陪伴派",
        "summary": "看你在和朋友、家人相处时，更偏自己的节奏还是更会照顾别人。",
    },
    {
        "id": "craft",
        "name": "日常安排感",
        "left_label": "想到就做派",
        "right_label": "稳稳安排派",
        "summary": "看你更像边玩边想，还是会先把事情安排得明明白白。",
    },
    {
        "id": "moxie",
        "name": "带头劲头",
        "left_label": "先跟着看派",
        "right_label": "自然带队派",
        "summary": "看你在一群人里更喜欢先跟着大家，还是会自然地把节奏带起来。",
    },
]

QUESTION_BANK = [
    {
        "id": "q01",
        "dimension": "spark",
        "prompt": "下过雨以后，院子里出现一大滩泥坑，你第一反应更像哪一种？",
        "options": [
            {"label": "先站远一点看看，鞋子脏了怎么办", "score": -2},
            {"label": "如果大家都去玩，我再慢慢靠近", "score": -1},
            {"label": "已经准备试探着踩两脚了", "score": 1},
            {"label": "当然是立刻跳进去，还要叫上别人一起", "score": 2},
        ],
    },
    {
        "id": "q02",
        "dimension": "spark",
        "prompt": "在游乐场或者游乐区里，你通常更像哪一种小朋友？",
        "options": [
            {"label": "先适应一下，不会马上冲进最热闹的地方", "score": -2},
            {"label": "挑自己熟悉的项目慢慢玩", "score": -1},
            {"label": "很快就会被大家带进气氛里", "score": 1},
            {"label": "哪里最热闹我就往哪里去", "score": 2},
        ],
    },
    {
        "id": "q03",
        "dimension": "spark",
        "prompt": "如果今天是游戏日，要在“恐龙、泡泡、扮家家、沙坑”里选一个开场，你会？",
        "options": [
            {"label": "先看别人选什么，再决定自己玩什么", "score": -2},
            {"label": "选一个安静一点、自己熟悉的玩法", "score": -1},
            {"label": "哪个热闹我就玩哪个", "score": 1},
            {"label": "我不仅要玩，还会立刻宣布今天大家一起玩什么", "score": 2},
        ],
    },
    {
        "id": "q04",
        "dimension": "heart",
        "prompt": "朋友今天心情不太好，像乔治找不到恐龙那样委屈，你通常会？",
        "options": [
            {"label": "先让他自己缓一缓，不会马上凑过去", "score": -2},
            {"label": "会安静陪着，但不会说太多", "score": -1},
            {"label": "主动问问怎么了，再一起想办法", "score": 1},
            {"label": "会立刻进入“帮他开心起来”模式", "score": 2},
        ],
    },
    {
        "id": "q05",
        "dimension": "heart",
        "prompt": "大家一起玩角色扮演游戏时，你更在意哪件事？",
        "options": [
            {"label": "每个人按自己节奏来，别互相打扰", "score": -2},
            {"label": "大家别吵起来就行", "score": -1},
            {"label": "每个人都能参与进去最好", "score": 1},
            {"label": "我很在意有没有人被落下、有没有人不开心", "score": 2},
        ],
    },
    {
        "id": "q06",
        "dimension": "heart",
        "prompt": "如果朋友第一次来你家玩，你会更像哪一种？",
        "options": [
            {"label": "先让他自己适应，我不会特别热情招呼", "score": -2},
            {"label": "会陪着，但比较自然，不会安排太多", "score": -1},
            {"label": "会主动介绍玩具、房间和好玩的地方", "score": 1},
            {"label": "我会很认真地想：怎么让他玩得最开心", "score": 2},
        ],
    },
    {
        "id": "q07",
        "dimension": "craft",
        "prompt": "一家人准备去野餐或出门玩，你通常是哪种状态？",
        "options": [
            {"label": "到时候再说，缺什么现场想办法", "score": -2},
            {"label": "大概知道要做什么就行", "score": -1},
            {"label": "会提前想想该带哪些东西", "score": 1},
            {"label": "我会像猪妈妈一样把事情安排得稳稳当当", "score": 2},
        ],
    },
    {
        "id": "q08",
        "dimension": "craft",
        "prompt": "如果今天要搭帐篷、做手工或准备一场茶会，你更像哪一种？",
        "options": [
            {"label": "先玩起来再说，边玩边改", "score": -2},
            {"label": "差不多能做出来就行", "score": -1},
            {"label": "我会先想步骤，再开始做", "score": 1},
            {"label": "我会很自然地开始分工、安排和检查", "score": 2},
        ],
    },
    {
        "id": "q09",
        "dimension": "craft",
        "prompt": "如果骑车、坐校车或出门时突然发现少带了重要东西，你一般会？",
        "options": [
            {"label": "先不管了，看看能不能凑合", "score": -2},
            {"label": "看情况，如果不麻烦就补救一下", "score": -1},
            {"label": "如果重要，我会马上回头处理", "score": 1},
            {"label": "这种事很少发生，因为我通常会提前检查", "score": 2},
        ],
    },
    {
        "id": "q10",
        "dimension": "moxie",
        "prompt": "在沙坑、操场或游戏角里，大家都还没决定怎么玩时，你通常会？",
        "options": [
            {"label": "先看大家想做什么", "score": -2},
            {"label": "如果有人提议，我多半会跟着加入", "score": -1},
            {"label": "我会说出自己的想法，带一点方向", "score": 1},
            {"label": "我常常就是那个最先拍板“我们玩这个吧”的人", "score": 2},
        ],
    },
    {
        "id": "q11",
        "dimension": "moxie",
        "prompt": "如果今天要玩“秘密任务”“扮护士”或者“假装探险”，你更像谁？",
        "options": [
            {"label": "我先看大家怎么演，再决定要不要加入", "score": -2},
            {"label": "只要有人带一下，我就能玩起来", "score": -1},
            {"label": "我会主动给自己安排一个角色", "score": 1},
            {"label": "我不仅安排自己，还会自然分配大家的角色", "score": 2},
        ],
    },
    {
        "id": "q12",
        "dimension": "moxie",
        "prompt": "在一群朋友里，别人更容易觉得你是哪一种？",
        "options": [
            {"label": "安静一点，不会第一时间抢着出头", "score": -2},
            {"label": "平时随和，但该跟上时会跟上", "score": -1},
            {"label": "挺有主意，常常会推动事情往前走", "score": 1},
            {"label": "很有带头劲，常常自然就成了领头那个", "score": 2},
        ],
    },
    {
        "id": "q13",
        "dimension": "spark",
        "prompt": "如果今天要去踩泥坑、放风筝或者玩泡泡，你最像哪种状态？",
        "options": [
            {"label": "我会先看看天气、鞋子和场地，再决定玩不玩", "score": -2},
            {"label": "别人玩起来了我才会慢慢加入", "score": -1},
            {"label": "听起来就很好玩，我已经想试试了", "score": 1},
            {"label": "我会第一个冲出去，而且还会大声叫大家一起", "score": 2},
        ],
    },
    {
        "id": "q14",
        "dimension": "spark",
        "prompt": "在学校做游戏、唱歌或排节目时，你更像哪一种？",
        "options": [
            {"label": "喜欢先在旁边看一会儿，不急着表现", "score": -2},
            {"label": "只要氛围还好，我就会慢慢加入", "score": -1},
            {"label": "我通常愿意参与，而且挺投入", "score": 1},
            {"label": "这种场合我经常特别兴奋，整个人都亮起来了", "score": 2},
        ],
    },
    {
        "id": "q15",
        "dimension": "spark",
        "prompt": "如果发现一个很新奇的玩法，比如会发光的玩具或奇怪的小机器，你通常会？",
        "options": [
            {"label": "先观察别人怎么碰，自己不急着试", "score": -2},
            {"label": "有点想试，但会比较谨慎", "score": -1},
            {"label": "会主动去摸一摸、看一看", "score": 1},
            {"label": "我会很兴奋，立刻围上去研究", "score": 2},
        ],
    },
    {
        "id": "q16",
        "dimension": "heart",
        "prompt": "如果朋友在玩游戏时输了，开始闹小脾气，你会？",
        "options": [
            {"label": "先让他自己缓缓，我不会立刻安慰", "score": -2},
            {"label": "会看着他，但不会马上插手", "score": -1},
            {"label": "会说点好听的话，让气氛别太僵", "score": 1},
            {"label": "我会主动哄他，想办法让他重新开心起来", "score": 2},
        ],
    },
    {
        "id": "q17",
        "dimension": "heart",
        "prompt": "一起玩分享游戏时，如果只有一个最好玩的玩具，你更可能？",
        "options": [
            {"label": "谁先拿到就谁先玩，我不太想管", "score": -2},
            {"label": "别人要玩我会让一下，但不会主动安排", "score": -1},
            {"label": "会主动说大家轮流玩比较好", "score": 1},
            {"label": "我会很在意每个人是不是都玩到了", "score": 2},
        ],
    },
    {
        "id": "q18",
        "dimension": "heart",
        "prompt": "家里有人忙不过来时，你更像哪一种？",
        "options": [
            {"label": "我先继续做自己的事，不一定马上过去", "score": -2},
            {"label": "如果被叫到，我会帮忙", "score": -1},
            {"label": "会主动搭把手，看看能帮什么", "score": 1},
            {"label": "我会很自然地进入帮忙模式，主动照顾周围", "score": 2},
        ],
    },
    {
        "id": "q19",
        "dimension": "craft",
        "prompt": "如果今天全家要出门旅行，你更像谁？",
        "options": [
            {"label": "到了再说，别把事情想太复杂", "score": -2},
            {"label": "大概带齐就行，不会特别检查", "score": -1},
            {"label": "会在心里过一遍该带什么", "score": 1},
            {"label": "会提前整理、确认、再整理一次", "score": 2},
        ],
    },
    {
        "id": "q20",
        "dimension": "craft",
        "prompt": "如果今天要帮忙做蛋糕、做早餐或准备茶会，你通常会？",
        "options": [
            {"label": "先动手再说，边做边想", "score": -2},
            {"label": "看着做，差不多就行", "score": -1},
            {"label": "会先看步骤，再一项项来", "score": 1},
            {"label": "我会不由自主地开始安排顺序和细节", "score": 2},
        ],
    },
    {
        "id": "q21",
        "dimension": "craft",
        "prompt": "如果要搭积木、拼图或做模型，你一般会怎么开始？",
        "options": [
            {"label": "先随便拼拼看，想到哪做到哪", "score": -2},
            {"label": "边看边试，不会特别计划", "score": -1},
            {"label": "会先找规律，再开始搭", "score": 1},
            {"label": "我会先想结构、顺序和哪里最容易出错", "score": 2},
        ],
    },
    {
        "id": "q22",
        "dimension": "moxie",
        "prompt": "如果今天要组织一场“海盗探险”或者“秘密基地”游戏，你更像哪一种？",
        "options": [
            {"label": "我更愿意先看别人怎么安排", "score": -2},
            {"label": "只要别人开个头，我就会跟上", "score": -1},
            {"label": "我会贡献想法，也会推动大家开玩", "score": 1},
            {"label": "我常常会直接进入组织者状态", "score": 2},
        ],
    },
    {
        "id": "q23",
        "dimension": "moxie",
        "prompt": "大家在一起画画、讲故事或假装演节目时，你更像哪一种角色？",
        "options": [
            {"label": "安静参与，不一定抢中心位置", "score": -2},
            {"label": "别人邀请我我就上，不太主动争", "score": -1},
            {"label": "我会自己挑一个存在感还不错的位置", "score": 1},
            {"label": "我很容易就成了最先开口、最先带动作的人", "score": 2},
        ],
    },
    {
        "id": "q24",
        "dimension": "moxie",
        "prompt": "如果大家在讨论“接下来去哪儿玩、先玩什么”，你通常更像谁？",
        "options": [
            {"label": "我会先听听，看看大家怎么说", "score": -2},
            {"label": "我会跟随大多数人的决定", "score": -1},
            {"label": "我会说出自己想去的地方，争取一下", "score": 1},
            {"label": "我经常是那个一句话就把路线定下来的人", "score": 2},
        ],
    },
]

DIMENSION_COPY = {
    "spark": {
        "high": "你带有比较强的点火感，容易给环境加热，也更愿意先把气氛带起来。",
        "mid": "你的活力是可调节的，不会持续高燃，但也不至于全程隐身。",
        "low": "你偏慢热和稳态，更擅长在观察清楚后再发力。",
    },
    "heart": {
        "high": "你很会照顾场域和情绪，对关系的温度也相对敏感。",
        "mid": "你既有分寸，也愿意在合适的时候给出支持。",
        "low": "你更强调边界和独立空间，不太喜欢被情绪裹挟。",
    },
    "craft": {
        "high": "你做事偏稳，习惯把风险、节奏和推进感握在手里。",
        "mid": "你在即兴与计划之间比较平衡，能看情况切换。",
        "low": "你更偏临场发挥与灵感驱动，节奏感自由但也更跳。",
    },
    "moxie": {
        "high": "你有明显的主导倾向，遇到事情更愿意直接推进和表态。",
        "mid": "你会在需要时站出来，但不会每次都抢节奏。",
        "low": "你更喜欢先看清局势，再决定要不要主动掌舵。",
    },
}

FEATURED_CHARACTER_NAMES = {
    "Peppa Pig",
    "George Pig",
    "Mummy Pig",
    "Daddy Pig",
    "Suzy Sheep",
    "Rebecca Rabbit",
    "Pedro Pony",
    "Candy Cat",
    "Danny Dog",
    "Gerald Giraffe",
    "Emily Elephant",
    "Edmond Elephant",
    "Madame Gazelle",
    "Granny Pig",
    "Grandpa Pig",
    "Mummy Rabbit",
    "Daddy Rabbit",
    "Grampy Rabbit",
    "Mandy Mouse",
    "The Queen",
}

TRAIT_WEIGHTS = {
    "kind": {"heart": 2},
    "caring": {"heart": 2, "craft": 1},
    "friendly": {"heart": 2},
    "cheerful": {"spark": 1, "heart": 1},
    "energetic": {"spark": 2, "moxie": 1},
    "playful": {"spark": 1, "craft": -1},
    "curious": {"spark": 1, "craft": -1},
    "smart": {"craft": 1},
    "responsible": {"craft": 2},
    "brave": {"moxie": 2},
    "bossy": {"moxie": 2, "heart": -1},
    "loud": {"spark": 2, "moxie": 1},
    "shy": {"spark": -1, "moxie": -2},
    "funny": {"spark": 1, "heart": 1},
    "calm": {"spark": -2, "craft": 1, "moxie": -1},
    "creative": {"craft": -1},
    "sporty": {"spark": 1},
    "stubborn": {"moxie": 2, "heart": -1},
    "clumsy": {"craft": -1},
    "absent-minded": {"craft": -2},
    "lazy": {"spark": -2, "craft": -2},
    "emotional": {"spark": 1, "heart": 1},
}

ARCHETYPE_MATRIX = [
    {
        "code": "SUNNY-SPARK",
        "title": "高能小太阳",
        "match_blurb": "你像那种能把场子带热、也愿意把人照顾到位的角色。",
        "conditions": {"spark": 25, "heart": 15},
    },
    {
        "code": "BOSSY-BOUNCE",
        "title": "带队小喇叭",
        "match_blurb": "你既有能量又有主导欲，像会直接把节奏抢回自己手里的角色。",
        "conditions": {"spark": 15, "moxie": 20},
    },
    {
        "code": "SOFT-ANCHOR",
        "title": "稳稳照顾者",
        "match_blurb": "你更像团队里的稳定器，气氛不吵但很能兜底。",
        "conditions": {"heart": 15, "craft": 15},
    },
    {
        "code": "QUIET-COMPASS",
        "title": "安静掌舵者",
        "match_blurb": "你不是最吵的那个，但判断和推进并不弱。",
        "conditions": {"craft": 10, "moxie": 10, "spark": -10},
    },
]

NAME_TRANSLATIONS = {
    "Pig": "小猪",
    "Rabbit": "小兔",
    "Sheep": "小羊",
    "Dog": "小狗",
    "Cat": "小猫",
    "Peppa Pig": "佩奇",
    "George Pig": "乔治",
    "Mummy Pig": "猪妈妈",
    "Daddy Pig": "猪爸爸",
    "Granny Pig": "猪奶奶",
    "Grandpa Pig": "猪爷爷",
    "Auntie Pig": "猪阿姨",
    "Auntie Dottie": "朵蒂阿姨",
    "Uncle Pig": "猪叔叔",
    "Chloé Pig": "克洛伊",
    "Alexander Pig": "小猪亚历山大",
    "Baby Alexander": "宝宝亚历山大",
    "Evie Pig": "小猪伊薇",
    "Suzy Sheep": "苏西羊",
    "Suzy": "苏西羊",
    "Rebecca Rabbit": "丽贝卡兔",
    "Richard Rabbit": "理查德兔",
    "Daddy Rabbit": "兔爸爸",
    "Mummy Rabbit": "兔妈妈",
    "Grampy Rabbit": "兔爷爷",
    "Emily Elephant": "艾米莉小象",
    "Edmond Elephant": "埃德蒙小象",
    "Candy Cat": "坎迪猫",
    "Danny Dog": "丹尼狗",
    "Pedro Pony": "佩德罗小马",
    "Gerald Giraffe": "杰拉德长颈鹿",
    "Madame Gazelle": "羚羊夫人",
    "Mandy Mouse": "曼迪鼠",
    "The Queen": "女王",
    "Granddad Dog": "狗爷爷",
    "Granny Dog": "狗奶奶",
    "Freddy Fox": "弗雷迪狐狸",
    "Wendy Wolf": "温迪狼",
    "Zoë Zebra": "佐伊斑马",
    "Zuzu & Zaza Zebra": "祖祖和扎扎斑马",
    "Daddy Zebra": "斑马爸爸",
    "Mummy Zebra": "斑马妈妈",
    "Mummy Sheep": "羊妈妈",
    "Daddy Cat": "猫爸爸",
    "Mummy Cat": "猫妈妈",
    "Doctor Brown Bear": "棕熊医生",
    "Doctor Elephant": "小象医生",
    "Miss Rabbit": "兔小姐",
    "Mr. Potato": "土豆先生",
    "Super Potato": "超级土豆先生",
    "Father Christmas": "圣诞老人",
}

SPECIES_TRANSLATIONS = {
    "Pig": "小猪",
    "Rabbit": "小兔",
    "Border Leicester Sheep": "小羊",
    "Sheep": "小羊",
    "Dog": "小狗",
    "Cat": "小猫",
    "Pony": "小马",
    "Elephant": "小象",
    "Gazelle": "羚羊",
    "Giraffe": "长颈鹿",
    "Mouse": "小鼠",
    "Zebra": "斑马",
    "Human": "人类",
    "Bear": "小熊",
    "Goat": "山羊",
    "Fox": "狐狸",
    "Wolf": "小狼",
    "Cow": "奶牛",
}

TRAIT_TRANSLATIONS = {
    "kind": "善良",
    "caring": "会照顾人",
    "friendly": "友好",
    "cheerful": "开朗",
    "energetic": "有活力",
    "playful": "爱玩",
    "curious": "好奇心强",
    "smart": "聪明",
    "responsible": "靠谱",
    "brave": "大胆",
    "bossy": "有主见",
    "loud": "声音大",
    "shy": "害羞",
    "funny": "有趣",
    "calm": "冷静",
    "creative": "有创意",
    "sporty": "爱运动",
    "stubborn": "倔强",
    "clumsy": "有点笨拙",
    "absent-minded": "容易分神",
    "lazy": "爱偷懒",
    "emotional": "情绪明显",
}

GENDER_TRANSLATIONS = {
    "Male": "男孩",
    "Female": "女孩",
}

QUIZ_RESULT_TRANSLATIONS = {
    "You're emotional and often pretty intense.": "你情绪很真，也很容易把感受直接写在脸上。",
    "You're confident and a bit loud at times.": "你很有自信，而且有时候会特别有存在感。",
    "You're very responsible and smart.": "你很靠谱，也很聪明，常常像能把事情稳住的人。",
    "You're a bit lazy, but you have a great sense of humor.": "你可能有点爱偷懒，但真的很会逗大家开心。",
}

FEATURED_CHARACTER_COPY = {
    "Peppa Pig": "佩奇是那种会主动把气氛带热的小朋友，喜欢玩、喜欢表达，也很容易成为场子里最有存在感的那个。",
    "George Pig": "乔治外表安静，但情绪很真，喜欢自己在意的东西，比如恐龙，也会在熟悉的人面前显得特别可爱。",
    "Mummy Pig": "猪妈妈给人的感觉是温柔又稳当，像那种能把家里节奏安排好、又很会照顾大家的人。",
    "Daddy Pig": "猪爸爸有点迷糊，也有点爱逞强，但整体是轻松、幽默、很会让大家放松的人。",
    "Suzy Sheep": "苏西羊是很典型的朋友型角色，既会陪伴别人，也常常有自己的小主意和主导欲。",
    "Rebecca Rabbit": "丽贝卡兔活泼、友好、愿意和大家一起玩，同时又带一点害羞和敏感。",
    "Pedro Pony": "佩德罗小马是松弛感比较强的角色，看起来有点慢半拍，但也常常很可爱、很有自己的节奏。",
    "Candy Cat": "坎迪猫通常给人友好又柔和的感觉，不爱把场面弄得太紧张，更像轻轻加入大家的人。",
    "Danny Dog": "丹尼狗有点勇敢、也有点直接，整体像那种在热闹场景里很容易玩开的朋友。",
    "Gerald Giraffe": "杰拉德长颈鹿偏温和、友好、慢一点热起来，但一旦熟了就会很自然。",
    "Emily Elephant": "艾米莉小象聪明、懂事，也有一定的表达欲，看起来像又会想事又会参与的人。",
    "Edmond Elephant": "埃德蒙小象给人的感觉更偏知识型和认真型，像小朋友里的小小思考派。",
    "Madame Gazelle": "羚羊夫人是非常典型的组织者角色，会照顾秩序，也有足够的威信去把大家带起来。",
    "Granny Pig": "猪奶奶温柔、会照顾人，也很懂得在平常生活里制造温暖和乐趣。",
    "Grandpa Pig": "猪爷爷更像有自己坚持和做事方式的人，偶尔固执，但对家人很上心。",
    "Mummy Rabbit": "兔妈妈是温和型照顾者，给人的感觉是可靠、平稳、很适合让人安心。",
    "Daddy Rabbit": "兔爸爸像那种脑子灵活、能解释很多事情、也愿意帮忙的人。",
    "Grampy Rabbit": "兔爷爷有经验、有主意，也有点不按常理出牌，像热闹里的老顽童。",
    "Mandy Mouse": "曼迪鼠乐观、友好、很有韧劲，像那种会在自己的方式里闪闪发光的人。",
    "The Queen": "女王型结果通常意味着你看起来不吵，但很稳，有自己的分寸和被人尊重的气场。",
}


@dataclass
class BuildResult:
    dataset: dict[str, Any]
    output_json: Path
    output_js: Path
    dist_dir: Path


def ensure_dirs() -> None:
    RAW_DIR.mkdir(parents=True, exist_ok=True)
    PROCESSED_DIR.mkdir(parents=True, exist_ok=True)
    DIST_DIR.mkdir(parents=True, exist_ok=True)


def clean_text(value: str) -> str:
    text = re.sub(r"\[\d+\]", "", value or "")
    text = text.replace("\xa0", " ")
    text = re.sub(r"\s+", " ", text).strip()
    return text


def normalize_ascii(value: str) -> str:
    normalized = unicodedata.normalize("NFKD", value)
    return normalized.encode("ascii", "ignore").decode("ascii")


def slugify(value: str) -> str:
    ascii_value = normalize_ascii(value.lower())
    slug = re.sub(r"[^a-z0-9]+", "-", ascii_value).strip("-")
    return slug or "unknown"


def split_named_people(value: str) -> list[str]:
    names = re.findall(r"([A-Z][A-Za-z0-9.'&\-\s]+?)\s*\(", value)
    cleaned = []
    seen = set()
    for name in names:
        nice = clean_text(name)
        if nice and nice not in seen:
            seen.add(nice)
            cleaned.append(nice)
    return cleaned


def extract_traits(text: str) -> list[str]:
    lowered = clean_text(text).lower()
    traits = []
    for trait, patterns in TRAIT_PATTERNS.items():
        if any(pattern in lowered for pattern in patterns):
            traits.append(trait)
    return traits[:8]


def extract_section_text(soup: BeautifulSoup) -> str:
    for section_name in SECTION_PRIORITY:
        heading = soup.select_one(f'.mw-parser-output h2[id="{section_name}"], .mw-parser-output h3[id="{section_name}"]')
        if not heading:
            for candidate in soup.select(".mw-parser-output .mw-headline"):
                if candidate.get("id") == section_name:
                    heading = candidate.find_parent(["h2", "h3"])
                    break
        if not heading:
            continue

        parts = []
        for sibling in heading.find_next_siblings():
            if sibling.name in {"h2", "h3"}:
                break
            nodes = sibling.select("p") if sibling.name == "section" else [sibling] if sibling.name == "p" else []
            for node in nodes:
                text = clean_text(node.get_text(" ", strip=True))
                if text:
                    parts.append(text)
        if parts:
            return " ".join(parts)

    lead_paragraphs = []
    for paragraph in soup.select(".mw-parser-output > p"):
        text = clean_text(paragraph.get_text(" ", strip=True))
        if text:
            lead_paragraphs.append(text)
        if len(lead_paragraphs) >= 2:
            break
    return " ".join(lead_paragraphs) or "No description available"


def parse_infobox(soup: BeautifulSoup) -> dict[str, Any]:
    infobox = {
        "species": "",
        "gender": "",
        "age": "",
        "first_appearance": "",
        "birthday": "",
        "relatives": [],
        "friends": [],
    }
    box = soup.select_one(".portable-infobox")
    if not box:
        return infobox

    for item in box.select(".pi-item"):
        label_el = item.select_one(".pi-data-label")
        value_el = item.select_one(".pi-data-value")
        if not label_el or not value_el:
            continue

        label = clean_text(label_el.get_text(" ", strip=True)).lower()
        value = clean_text(value_el.get_text(" ", strip=True))

        if label == "species" and not infobox["species"]:
            infobox["species"] = value
        elif label == "gender" and not infobox["gender"]:
            infobox["gender"] = value
        elif label == "age" and not infobox["age"]:
            infobox["age"] = value
        elif label == "first appearance" and not infobox["first_appearance"]:
            infobox["first_appearance"] = value
        elif label == "birthday" and not infobox["birthday"]:
            infobox["birthday"] = value
        elif label.startswith("relative"):
            infobox["relatives"] = split_named_people(value)
        elif label.startswith("friend"):
            infobox["friends"] = split_named_people(value)

    return infobox


def parse_character_page(name: str, url: str, html: str) -> dict[str, Any]:
    soup = BeautifulSoup(html, "html.parser")
    summary = extract_section_text(soup)
    infobox = parse_infobox(soup)
    return {
        "name": name,
        "slug": slugify(name),
        "url": url,
        "summary": summary,
        "traits": extract_traits(summary),
        **infobox,
    }


def parse_character_list(html: str) -> list[dict[str, str]]:
    soup = BeautifulSoup(html, "html.parser")
    candidates: list[dict[str, str]] = []
    seen = set()

    for anchor in soup.select(".mw-parser-output ul li a"):
        href = anchor.get("href", "")
        name = clean_text(anchor.get_text(" ", strip=True))
        if not href.startswith("/wiki/"):
            continue
        if ":" in href or any(href.startswith(prefix) for prefix in IGNORED_LINK_PREFIXES):
            continue
        if not name or name in IGNORED_LINK_TEXT:
            continue

        url = f"https://peppapig.fandom.com{href}"
        key = (name, url)
        if key in seen:
            continue
        seen.add(key)
        candidates.append({"name": name, "url": url})

    return candidates


def fetch_text(url: str, use_cloudscraper: bool = False) -> str:
    if use_cloudscraper:
        scraper = cloudscraper.create_scraper()
        response = scraper.get(url, timeout=20)
    else:
        response = requests.get(url, timeout=20, headers={"User-Agent": "Mozilla/5.0"})
    response.raise_for_status()
    return response.text


def try_read(path: Path) -> str | None:
    if path.exists():
        return path.read_text(encoding="utf-8")
    return None


def load_legacy_json() -> dict[str, Any]:
    legacy_path = LEGACY_ROOT / "peppa_data.json"
    if legacy_path.exists():
        return json.loads(legacy_path.read_text(encoding="utf-8"))
    return {}


def dedupe_characters(characters: list[dict[str, Any]]) -> list[dict[str, Any]]:
    keepers: dict[str, dict[str, Any]] = {}
    aliases = {
        "suzy": "suzy-sheep",
        "lotte": "lotte-llama",
        "gabriella": "gabriella-goat",
    }

    for item in characters:
        slug = aliases.get(item["slug"], item["slug"])
        current = keepers.get(slug)
        score = (
            len(item.get("traits", [])),
            len(item.get("summary", "")),
            len(item.get("relatives", [])) + len(item.get("friends", [])),
        )
        if not current:
            keepers[slug] = {**item, "slug": slug}
            continue
        current_score = (
            len(current.get("traits", [])),
            len(current.get("summary", "")),
            len(current.get("relatives", [])) + len(current.get("friends", [])),
        )
        if score > current_score:
            keepers[slug] = {**item, "slug": slug}

    return sorted(keepers.values(), key=lambda item: item["name"].lower())


def scrape_fandom() -> list[dict[str, Any]]:
    ensure_dirs()
    list_cache = RAW_DIR / "fandom_list.html"
    legacy = load_legacy_json()

    try:
        list_html = fetch_text(FANDOM_LIST_URL, use_cloudscraper=True)
        list_cache.write_text(list_html, encoding="utf-8")
    except Exception:
        list_html = try_read(list_cache) or try_read(LEGACY_ROOT / "list.html")

    if not list_html:
        legacy_rows = legacy.get("fandom_characters", [])
        return dedupe_characters(
            [
                {
                    "name": row["name"],
                    "slug": slugify(row["name"]),
                    "url": row["url"],
                    "summary": row.get("personality", "No description available"),
                    "traits": extract_traits(row.get("personality", "")),
                    "species": "",
                    "gender": "",
                    "age": "",
                    "first_appearance": "",
                    "birthday": "",
                    "relatives": [],
                    "friends": [],
                }
                for row in legacy_rows
            ]
        )

    links = parse_character_list(list_html)
    results: list[dict[str, Any]] = []

    def fetch_one(row: dict[str, str]) -> dict[str, Any] | None:
        file_name = f"{slugify(row['name'])}.html"
        cache_path = RAW_DIR / file_name
        html = None
        try:
            html = fetch_text(row["url"], use_cloudscraper=True)
            cache_path.write_text(html, encoding="utf-8")
        except Exception:
            html = try_read(cache_path)
        if not html:
            return None
        return parse_character_page(row["name"], row["url"], html)

    with ThreadPoolExecutor(max_workers=8) as executor:
        futures = [executor.submit(fetch_one, row) for row in links]
        for future in as_completed(futures):
            row = future.result()
            if row:
                results.append(row)

    if results:
        return dedupe_characters(results)

    legacy_rows = legacy.get("fandom_characters", [])
    return dedupe_characters(
        [
            {
                "name": row["name"],
                "slug": slugify(row["name"]),
                "url": row["url"],
                "summary": row.get("personality", "No description available"),
                "traits": extract_traits(row.get("personality", "")),
                "species": "",
                "gender": "",
                "age": "",
                "first_appearance": "",
                "birthday": "",
                "relatives": [],
                "friends": [],
            }
            for row in legacy_rows
        ]
    )


def scrape_buzzfeed() -> list[dict[str, Any]]:
    ensure_dirs()
    cache_path = RAW_DIR / "buzzfeed.html"
    legacy = load_legacy_json()

    try:
        html = fetch_text(BUZZFEED_URL)
        cache_path.write_text(html, encoding="utf-8")
    except Exception:
        html = try_read(cache_path) or try_read(LEGACY_ROOT / "buzzfeed.html")

    if not html:
        quiz_rows = legacy.get("buzzfeed_quiz_results", [])
        return [
            {
                "character": row.get("character", ""),
                "summary": row.get("personality", ""),
                "traits": extract_traits(row.get("personality", "")),
            }
            for row in quiz_rows
        ]

    soup = BeautifulSoup(html, "html.parser")
    next_data = soup.find("script", id="__NEXT_DATA__")
    if not next_data or not next_data.string:
        return []

    payload = json.loads(next_data.string)
    buzz = payload["props"]["pageProps"]["buzz"]
    rows = []
    for sub_buzz in buzz.get("sub_buzzes", []):
        results = sub_buzz.get("bfp_data", {}).get("data", {}).get("results", [])
        if not results:
            continue
        for item in results:
            summary = clean_text(item.get("description", "").replace("&quot;", '"'))
            rows.append(
                {
                    "character": clean_text(item.get("title", "")),
                    "summary": summary,
                    "traits": extract_traits(summary),
                }
            )
        break
    return rows


def normalize_dimension_value(value: int) -> int:
    return max(-100, min(100, value * 12))


def translate_name(name: str) -> str:
    return NAME_TRANSLATIONS.get(name, name)


def translate_species(species: str) -> str:
    if not species:
        return ""
    for source, target in SPECIES_TRANSLATIONS.items():
        if source in species:
            return target
    return species


def translate_gender(gender: str) -> str:
    return GENDER_TRANSLATIONS.get(gender, gender)


def translate_traits(traits: list[str]) -> list[str]:
    return [TRAIT_TRANSLATIONS.get(trait, trait) for trait in traits]


def translate_quiz_result(summary: str) -> str:
    return QUIZ_RESULT_TRANSLATIONS.get(summary, summary)


def build_summary_zh(character: dict[str, Any], combined_traits: list[str], quiz_result: str) -> str:
    if character["name"] in FEATURED_CHARACTER_COPY:
        return FEATURED_CHARACTER_COPY[character["name"]]

    name_zh = translate_name(character["name"])
    species_zh = translate_species(character.get("species", "")) or "角色"
    traits_zh = translate_traits(combined_traits)
    relatives = [translate_name(name) for name in character.get("relatives", [])[:3]]
    friends = [translate_name(name) for name in character.get("friends", [])[:3]]

    parts = [f"{name_zh}是佩奇宇宙里的{species_zh}角色。"]
    if traits_zh:
        parts.append(f"整体给人的感觉更像{'、'.join(traits_zh[:3])}。")
    if relatives:
        parts.append(f"和 { '、'.join(relatives) } 这些家人关系较近。")
    elif friends:
        parts.append(f"常常会和 { '、'.join(friends) } 一起出现。")
    if quiz_result:
        parts.append(translate_quiz_result(quiz_result))
    return "".join(parts)


def vector_distance(a: dict[str, int], b: dict[str, int]) -> int:
    return sum(abs(a[dim["id"]] - b[dim["id"]]) for dim in DIMENSIONS)


def build_character_vector(traits: list[str]) -> dict[str, int]:
    scores = {dimension["id"]: 0 for dimension in DIMENSIONS}
    for trait in traits:
        for dimension_id, weight in TRAIT_WEIGHTS.get(trait, {}).items():
            scores[dimension_id] += weight
    return {dimension_id: normalize_dimension_value(value) for dimension_id, value in scores.items()}


def level_from_score(score: int) -> str:
    if score >= 25:
        return "high"
    if score <= -25:
        return "low"
    return "mid"


def build_dimension_notes(scores: dict[str, int]) -> list[dict[str, Any]]:
    notes = []
    for dimension in DIMENSIONS:
        score = scores[dimension["id"]]
        level = level_from_score(score)
        notes.append(
            {
                "id": dimension["id"],
                "name": dimension["name"],
                "score": score,
                "left_label": dimension["left_label"],
                "right_label": dimension["right_label"],
                "summary": DIMENSION_COPY[dimension["id"]][level],
            }
        )
    return notes


def build_result_title(scores: dict[str, int]) -> str:
    spark = "高能" if scores["spark"] >= 15 else "慢热" if scores["spark"] <= -15 else "平衡"
    heart = "照顾型" if scores["heart"] >= 15 else "边界型" if scores["heart"] <= -15 else "适配型"
    return f"{spark} × {heart}"


def pick_archetype(scores: dict[str, int]) -> dict[str, str]:
    for archetype in ARCHETYPE_MATRIX:
        matched = True
        for dimension_id, threshold in archetype["conditions"].items():
            if threshold >= 0 and scores[dimension_id] < threshold:
                matched = False
                break
            if threshold < 0 and scores[dimension_id] > threshold:
                matched = False
                break
        if matched:
            return archetype
    return {
        "code": "BALANCED-MIX",
        "title": "混合观察型",
        "match_blurb": "你不是特别单线条的人，像多个角色特征叠在一起的混合体。",
    }


def merge_dataset(characters: list[dict[str, Any]], quiz_results: list[dict[str, Any]]) -> dict[str, Any]:
    quiz_map = {slugify(row["character"]): row for row in quiz_results if row.get("character")}
    merged_characters = []

    for character in characters:
        quiz_row = quiz_map.get(character["slug"])
        combined_traits = list(dict.fromkeys(character["traits"] + (quiz_row["traits"] if quiz_row else [])))
        vector = build_character_vector(combined_traits)
        quiz_result = quiz_row["summary"] if quiz_row else ""
        name_zh = translate_name(character["name"])
        species_zh = translate_species(character.get("species", ""))
        gender_zh = translate_gender(character.get("gender", ""))
        traits_zh = translate_traits(combined_traits)
        merged_characters.append(
            {
                **character,
                "name_zh": name_zh,
                "species_zh": species_zh,
                "gender_zh": gender_zh,
                "quiz_result": quiz_result,
                "quiz_result_zh": translate_quiz_result(quiz_result),
                "combined_traits": combined_traits,
                "combined_traits_zh": traits_zh,
                "summary_zh": build_summary_zh(character, combined_traits, quiz_result),
                "dimension_scores": vector,
                "dimension_notes": build_dimension_notes(vector),
                "featured": character["name"] in FEATURED_CHARACTER_NAMES,
            }
        )

    featured_characters = [item for item in merged_characters if item["featured"]]
    result_candidates = [
        {
            "name": item["name"],
            "name_zh": item["name_zh"],
            "slug": item["slug"],
            "species": item["species"],
            "species_zh": item["species_zh"],
            "summary": item["summary"],
            "summary_zh": item["summary_zh"],
            "traits": item["combined_traits"],
            "traits_zh": item["combined_traits_zh"],
            "vector": item["dimension_scores"],
            "url": item["url"],
        }
        for item in featured_characters
    ]

    stats = {
        "character_count": len(merged_characters),
        "featured_character_count": len(featured_characters),
        "quiz_result_count": len(quiz_results),
        "characters_with_traits": sum(1 for item in merged_characters if item["combined_traits"]),
        "question_count": len(QUESTION_BANK),
    }

    return {
        "meta": {
            "project": "Peppa Pig Ti",
            "generated_at": datetime.now(timezone.utc).isoformat(),
            "sources": [FANDOM_LIST_URL, BUZZFEED_URL],
            "stats": stats,
        },
        "framework": {
            "dimensions": DIMENSIONS,
            "questions": QUESTION_BANK,
            "archetypes": ARCHETYPE_MATRIX,
        },
        "quiz_results": quiz_results,
        "result_candidates": result_candidates,
        "characters": merged_characters,
    }


def build_dist(dataset: dict[str, Any], dataset_js: Path) -> Path:
    assets_dir = DIST_DIR / "assets"
    if DIST_DIR.exists():
        shutil.rmtree(DIST_DIR)
    assets_dir.mkdir(parents=True, exist_ok=True)

    for html_file in WEB_DIR.glob("*.html"):
        html = html_file.read_text(encoding="utf-8")
        html = html.replace("./styles.css", "./assets/styles.css")
        html = html.replace("../data/processed/ppti_dataset.js", "./assets/ppti-data.js")
        html = html.replace("./app.js", "./assets/app.js")
        (DIST_DIR / html_file.name).write_text(html, encoding="utf-8")

    shutil.copy2(WEB_DIR / "app.js", assets_dir / "app.js")
    shutil.copy2(WEB_DIR / "styles.css", assets_dir / "styles.css")
    shutil.copy2(dataset_js, assets_dir / "ppti-data.js")

    manifest = {
        "generated_at": dataset["meta"]["generated_at"],
        "entry": "index.html",
        "assets": ["assets/app.js", "assets/styles.css", "assets/ppti-data.js"],
    }
    (DIST_DIR / "site-manifest.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")
    (DIST_DIR / "404.html").write_text((WEB_DIR / "index.html").read_text(encoding="utf-8"), encoding="utf-8")
    return DIST_DIR


def build_dataset() -> BuildResult:
    ensure_dirs()
    characters = scrape_fandom()
    quiz_results = scrape_buzzfeed()
    dataset = merge_dataset(characters, quiz_results)

    output_json = PROCESSED_DIR / "ppti_dataset.json"
    output_js = PROCESSED_DIR / "ppti_dataset.js"

    output_json.write_text(json.dumps(dataset, ensure_ascii=False, indent=2), encoding="utf-8")
    output_js.write_text(
        "window.PPTI_DATA = " + json.dumps(dataset, ensure_ascii=False, indent=2) + ";\n",
        encoding="utf-8",
    )
    dist_dir = build_dist(dataset, output_js)
    return BuildResult(dataset=dataset, output_json=output_json, output_js=output_js, dist_dir=dist_dir)
