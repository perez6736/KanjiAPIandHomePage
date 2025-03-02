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
  getJouyouKanjiGrade: () => {
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
  getKanjiMeanings: (kanji) => {
    return new Promise((resolve, reject) => {
      db.all(
        `SELECT kanji, language, meaning FROM meanings WHERE kanji = ?`,
        [kanji],
        (err, rows) => {
          if (err) reject(err);
          else resolve(rows);
        }
      );
    });
  },

  getKanjiReadings: (kanji) => {
    return new Promise((resolve, reject) => {
      db.all(
        `SELECT kanji, type, reading FROM readings WHERE kanji = ?`,
        [kanji],
        (err, rows) => {
          if (err) reject(err);
          else resolve(rows);
        }
      );
    });
  },

  getKanjiNanoris: (kanji) => {
    return new Promise((resolve, reject) => {
      db.all(
        `SELECT kanji, nanori FROM nanori WHERE kanji = ?`,
        [kanji],
        (err, rows) => {
          if (err) reject(err);
          else resolve(rows);
        }
      );
    });
  },
};

module.exports = kanjiDbModel;
