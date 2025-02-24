CREATE TABLE IF NOT EXISTS kanji (
    kanji TEXT PRIMARY KEY,
    unicode TEXT,
    grade INTEGER,
    stroke_count INTEGER,
    freq INTEGER,
    jlpt INTEGER,
    heisig INTEGER
);

CREATE TABLE IF NOT EXISTS meanings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    kanji TEXT,
    language TEXT, 
    meaning TEXT,
    FOREIGN KEY (kanji) REFERENCES kanji (kanji)
);

CREATE TABLE IF NOT EXISTS readings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    kanji TEXT,
    type TEXT,
    reading TEXT,
    FOREIGN KEY (kanji) REFERENCES kanji (kanji)
);

CREATE TABLE IF NOT EXISTS nanori (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    kanji TEXT,
    nanori TEXT,
    FOREIGN KEY (kanji) REFERENCES kanji (kanji)
);