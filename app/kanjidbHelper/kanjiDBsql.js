const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Connect to SQLite database
const db = new sqlite3.Database(
  path.join(__dirname, "../data/kanji.db"),
  (err) => {
    if (err) console.error("Database connection error:", err);
    else console.log("Connected to SQLite database. db sql");
  }
);

kanjiDbModel = {
  getAllJouyouKanji: () => {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT 
          k.*,
          GROUP_CONCAT(DISTINCT m.language || ':' || m.meaning) as meanings,
          GROUP_CONCAT(DISTINCT r.type || ':' || r.reading) as readings,
          GROUP_CONCAT(DISTINCT n.nanori) as nanoris
        FROM kanji k
        LEFT JOIN meanings m ON k.kanji = m.kanji
        LEFT JOIN readings r ON k.kanji = r.kanji
        LEFT JOIN nanori n ON k.kanji = n.kanji
        WHERE k.grade IS NOT NULL
        GROUP BY k.kanji
      `;

      db.all(query, [], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  },

  getJouyouKanjiByGrade: (grade) => {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT 
          k.*,
          GROUP_CONCAT(DISTINCT m.language || ':' || m.meaning) as meanings,
          GROUP_CONCAT(DISTINCT r.type || ':' || r.reading) as readings,
          GROUP_CONCAT(DISTINCT n.nanori) as nanoris
        FROM kanji k
        LEFT JOIN meanings m ON k.kanji = m.kanji
        LEFT JOIN readings r ON k.kanji = r.kanji
        LEFT JOIN nanori n ON k.kanji = n.kanji
        WHERE k.grade = ?
        GROUP BY k.kanji
      `;

      db.all(query, [grade], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  },

  getAllJlptKanji: () => {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT 
          k.*,
          GROUP_CONCAT(DISTINCT m.language || ':' || m.meaning) as meanings,
          GROUP_CONCAT(DISTINCT r.type || ':' || r.reading) as readings,
          GROUP_CONCAT(DISTINCT n.nanori) as nanoris
        FROM kanji k
        LEFT JOIN meanings m ON k.kanji = m.kanji
        LEFT JOIN readings r ON k.kanji = r.kanji
        LEFT JOIN nanori n ON k.kanji = n.kanji
        WHERE k.jlpt IS NOT NULL
        GROUP BY k.kanji
      `;

      db.all(query, [], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  },

  getJlptKanjiByNlevel: (NLevel) => {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT 
          k.*,
          GROUP_CONCAT(DISTINCT m.language || ':' || m.meaning) as meanings,
          GROUP_CONCAT(DISTINCT r.type || ':' || r.reading) as readings,
          GROUP_CONCAT(DISTINCT n.nanori) as nanoris
        FROM kanji k
        LEFT JOIN meanings m ON k.kanji = m.kanji
        LEFT JOIN readings r ON k.kanji = r.kanji
        LEFT JOIN nanori n ON k.kanji = n.kanji
        WHERE k.jlpt = ?
        GROUP BY k.kanji
      `;

      db.all(query, [NLevel], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  },

  getKanjisByKanjis: (kanjis) => {
    return new Promise((resolve, reject) => {
      const kanjiArray = Array.isArray(kanjis) ? kanjis : [kanjis];
      const placeholders = kanjiArray.map(() => "?").join(","); // Create placeholders for IN clause
      const query = `
        SELECT 
          k.*,
          GROUP_CONCAT(DISTINCT m.language || ':' || m.meaning) as meanings,
          GROUP_CONCAT(DISTINCT r.type || ':' || r.reading) as readings,
          GROUP_CONCAT(DISTINCT n.nanori) as nanoris
        FROM kanji k
        LEFT JOIN meanings m ON k.kanji = m.kanji
        LEFT JOIN readings r ON k.kanji = r.kanji
        LEFT JOIN nanori n ON k.kanji = n.kanji
        WHERE k.kanji IN (${placeholders})
        GROUP BY k.kanji
      `;

      console.log(query + " query modal");

      db.all(query, kanjiArray, (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  },
};

module.exports = kanjiDbModel;
