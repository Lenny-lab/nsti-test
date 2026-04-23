import sqlite3
import csv

DB_FILE = 'peppa_ppti.db'

def export_to_csv():
    """Export data from SQLite database to CSV files."""
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()
    
    # Export characters to CSV
    cursor.execute("SELECT id, name, url, personality FROM characters")
    characters = cursor.fetchall()
    
    with open('peppa_characters.csv', 'w', newline='', encoding='utf-8') as f:
        writer = csv.writer(f)
        writer.writerow(['ID', 'Name', 'URL', 'Personality'])
        writer.writerows(characters)
    print(f"Exported {len(characters)} characters to peppa_characters.csv")
    
    # Export quiz results to CSV
    cursor.execute("SELECT id, character_name, personality_summary FROM quiz_results")
    quiz_results = cursor.fetchall()
    
    with open('peppa_quiz_results.csv', 'w', newline='', encoding='utf-8') as f:
        writer = csv.writer(f)
        writer.writerow(['ID', 'Character Name', 'Personality Summary'])
        writer.writerows(quiz_results)
    print(f"Exported {len(quiz_results)} quiz results to peppa_quiz_results.csv")
    
    conn.close()

if __name__ == "__main__":
    export_to_csv()
