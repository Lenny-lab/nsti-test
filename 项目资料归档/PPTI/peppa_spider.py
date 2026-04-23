import cloudscraper
import json
import concurrent.futures
from bs4 import BeautifulSoup
import time
import re

def scrape_fandom():
    print("Fetching Fandom character list...")
    scraper = cloudscraper.create_scraper()
    url = "https://peppapig.fandom.com/wiki/List_of_Characters"
    try:
        r = scraper.get(url)
        r.raise_for_status()
    except Exception as e:
        print(f"Error fetching character list: {e}")
        return []
    
    soup = BeautifulSoup(r.text, 'html.parser')
    character_links = []
    
    # The characters are listed in ul -> li -> a
    # Let's target links under .mw-parser-output ul li a
    for a in soup.select('.mw-parser-output ul li a'):
        href = a.get('href', '')
        if href.startswith('/wiki/') and ':' not in href and not href.startswith('/wiki/List'):
            name = a.text.strip()
            if name and href not in [link['url'] for link in character_links]:
                character_links.append({
                    'name': name,
                    'url': f"https://peppapig.fandom.com{href}"
                })
    
    print(f"Found {len(character_links)} characters. Fetching details...")
    
    def fetch_character(char_info):
        try:
            res = scraper.get(char_info['url'], timeout=10)
            if res.status_code != 200:
                return None
            char_soup = BeautifulSoup(res.text, 'html.parser')
            
            # Try to find Personality, Bio, or About
            description = "No description available"
            for section_id in ['Personality', 'Bio', 'About']:
                h = char_soup.find(id=section_id)
                if h:
                    parent_h = h.find_parent(['h2', 'h3'])
                    if parent_h:
                        next_p = parent_h.find_next_sibling('p')
                        if next_p and next_p.text.strip():
                            description = next_p.text.strip()
                            # Clean up citation markers like [1]
                            description = re.sub(r'\[\d+\]', '', description)
                            break
            
            char_info['personality'] = description
            return char_info
        except Exception as e:
            # Silently fail on individual characters
            return None

    results = []
    # Use ThreadPool to fetch characters faster
    with concurrent.futures.ThreadPoolExecutor(max_workers=10) as executor:
        futures = {executor.submit(fetch_character, char): char for char in character_links}
        for i, future in enumerate(concurrent.futures.as_completed(futures), 1):
            data = future.result()
            if data:
                results.append(data)
            if i % 10 == 0:
                print(f"Processed {i}/{len(character_links)} characters...")
                
    return results

def scrape_buzzfeed():
    print("Fetching Buzzfeed quiz data...")
    scraper = cloudscraper.create_scraper()
    url = "https://www.buzzfeed.com/sespracklen/which-peppa-pig-character-are-you-rnefa3hlb"
    try:
        r = scraper.get(url)
        r.raise_for_status()
    except Exception as e:
        print(f"Error fetching buzzfeed: {e}")
        return []
    
    soup = BeautifulSoup(r.text, 'html.parser')
    next_data = soup.find('script', id='__NEXT_DATA__')
    if not next_data:
        print("Could not find Buzzfeed JSON data")
        return []
        
    try:
        data = json.loads(next_data.string)
        buzz = data['props']['pageProps']['buzz']
        
        # Find the sub_buzz that contains quiz results
        results = []
        for sb in buzz.get('sub_buzzes', []):
            if 'bfp_data' in sb and 'data' in sb['bfp_data'] and 'results' in sb['bfp_data']['data']:
                quiz_results = sb['bfp_data']['data']['results']
                for r in quiz_results:
                    results.append({
                        'character': r.get('title', ''),
                        'personality': r.get('description', '').replace('&quot;', '"')
                    })
                break
        return results
    except Exception as e:
        print(f"Error parsing Buzzfeed data: {e}")
        return []

def main():
    print("Starting Peppa Pig data extraction...")
    
    buzzfeed_data = scrape_buzzfeed()
    print(f"Extracted {len(buzzfeed_data)} Buzzfeed character personalities.")
    
    fandom_data = scrape_fandom()
    print(f"Extracted {len(fandom_data)} Fandom character profiles.")
    
    # Save to JSON
    output_data = {
        "buzzfeed_quiz_results": buzzfeed_data,
        "fandom_characters": fandom_data
    }
    
    with open('peppa_data.json', 'w', encoding='utf-8') as f:
        json.dump(output_data, f, ensure_ascii=False, indent=2)
        
    print("Data successfully saved to peppa_data.json")

if __name__ == "__main__":
    main()
