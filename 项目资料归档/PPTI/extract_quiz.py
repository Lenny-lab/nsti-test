import json
from bs4 import BeautifulSoup
import os

HTML_FILE = 'buzzfeed.html'
OUTPUT_FILE = 'peppa_quiz_questions.json'

def extract_questions():
    if not os.path.exists(HTML_FILE):
        print(f"Error: {HTML_FILE} not found.")
        return

    with open(HTML_FILE, 'r', encoding='utf-8') as f:
        html = f.read()

    soup = BeautifulSoup(html, 'html.parser')
    next_data = soup.find('script', id='__NEXT_DATA__')
    
    if not next_data:
        print("Could not find __NEXT_DATA__ script block.")
        return

    data = json.loads(next_data.string)
    buzz = data['props']['pageProps']['buzz']
    
    # Locate the sub_buzz with quiz data
    bfp_data = None
    for sb in buzz.get('sub_buzzes', []):
        if 'bfp_data' in sb and 'data' in sb['bfp_data'] and 'questions' in sb['bfp_data']['data']:
            bfp_data = sb['bfp_data']['data']
            break
            
    if not bfp_data:
        print("Could not find quiz questions in the data.")
        return

    # Extract Results (to map result_ids to character names)
    results_map = {}
    for res in bfp_data.get('results', []):
        results_map[res['id']] = res.get('title', 'Unknown Character')

    # Extract Questions and Answers
    quiz_questions = []
    for q_idx, q in enumerate(bfp_data.get('questions', [])):
        # In this specific Buzzfeed quiz format, the question text is often stored in tile_metadata
        question_text = q.get('title', '')
        if not question_text and 'tile_metadata' in q:
            question_text = q['tile_metadata'].get('tile_text', '')
            
        answers = []
        for a in q.get('answers', []):
            ans_text = a.get('text', '')
            if not ans_text and 'tile_metadata' in a:
                ans_text = a['tile_metadata'].get('tile_text', '')
                
            # Map the result_ids to character names
            associated_characters = [results_map.get(rid) for rid in a.get('result_ids', []) if rid in results_map]
            
            answers.append({
                'text': ans_text,
                'points_to': associated_characters
            })
            
        quiz_questions.append({
            'question_number': q_idx + 1,
            'question': question_text,
            'options': answers
        })

    # Save to JSON
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        json.dump(quiz_questions, f, ensure_ascii=False, indent=2)
        
    print(f"Successfully extracted {len(quiz_questions)} questions.")
    print(f"Data saved to {OUTPUT_FILE}")
    
    # Print formatted output for the user
    print("\n--- Buzzfeed Peppa Pig Quiz Questions ---")
    for q in quiz_questions:
        print(f"\nQ{q['question_number']}: {q['question']}")
        for i, opt in enumerate(q['options']):
            chars = ", ".join(opt['points_to']) if opt['points_to'] else "None"
            print(f"  {chr(65+i)}. {opt['text']}  --> (Points to: {chars})")

if __name__ == "__main__":
    extract_questions()
