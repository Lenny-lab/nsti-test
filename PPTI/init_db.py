import sqlite3
import json
import os

DB_FILE = 'peppa_ppti.db'
JSON_FILE = 'peppa_data.json'

def create_database():
    """Create the SQLite database and tables."""
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()
    
    # Create Fandom characters table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS characters (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE,
        url TEXT,
        personality TEXT
    )
    ''')
    
    # Create Buzzfeed quiz results table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS quiz_results (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        character_name TEXT NOT NULL,
        personality_summary TEXT NOT NULL
    )
    ''')
    
    # Create a table for PPTI Types (future use)
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS ppti_types (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        type_code TEXT NOT NULL UNIQUE, -- e.g., 'LBEC' (Loud, Bossy, Easygoing, Curious)
        description TEXT,
        character_id INTEGER,
        FOREIGN KEY (character_id) REFERENCES characters (id)
    )
    ''')
    
    conn.commit()
    conn.close()
    print(f"Database schema created successfully in {DB_FILE}")

def import_data():
    """Import data from JSON to SQLite database."""
    if not os.path.exists(JSON_FILE):
        print(f"Error: {JSON_FILE} not found. Please run the spider first.")
        return
        
    with open(JSON_FILE, 'r', encoding='utf-8') as f:
        data = json.load(f)
        
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()
    
    # Import Buzzfeed data
    buzzfeed_data = data.get('buzzfeed_quiz_results', [])
    cursor.execute("DELETE FROM quiz_results") # Clear existing
    for item in buzzfeed_data:
        cursor.execute(
            "INSERT INTO quiz_results (character_name, personality_summary) VALUES (?, ?)",
            (item.get('character', ''), item.get('personality', ''))
        )
    print(f"Imported {len(buzzfeed_data)} Buzzfeed quiz results.")
    
    # Import Fandom characters data
    fandom_data = data.get('fandom_characters', [])
    # We use INSERT OR REPLACE to handle potential duplicates on 'name'
    for item in fandom_data:
        cursor.execute(
            "INSERT OR REPLACE INTO characters (name, url, personality) VALUES (?, ?, ?)",
            (item.get('name', ''), item.get('url', ''), item.get('personality', ''))
        )
    print(f"Imported {len(fandom_data)} Fandom characters.")
    
    conn.commit()
    conn.close()
    print("Data import completed successfully.")

def query_db_stats():
    """Query and print basic stats to verify data."""
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()
    
    cursor.execute("SELECT COUNT(*) FROM characters")
    char_count = cursor.fetchone()[0]
    
    cursor.execute("SELECT COUNT(*) FROM quiz_results")
    quiz_count = cursor.fetchone()[0]
    
    print("\n--- Database Verification ---")
    print(f"Total characters in DB: {char_count}")
    print(f"Total quiz results in DB: {quiz_count}")
    
    print("\nSample Fandom Characters (Top 3):")
    cursor.execute("SELECT name, SUBSTR(personality, 1, 50) || '...' FROM characters LIMIT 3")
    for row in cursor.fetchall():
        print(f" - {row[0]}: {row[1]}")
        
    print("\nSample Buzzfeed Quiz Results:")
    cursor.execute("SELECT character_name, personality_summary FROM quiz_results LIMIT 3")
    for row in cursor.fetchall():
        print(f" - {row[0]}: {row[1]}")
        
    conn.close()

if __name__ == "__main__":
    create_database()
    import_data()
    query_db_stats()
