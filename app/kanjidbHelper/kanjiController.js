const db = require("./kanjiDBsql");

const kanjiController = {
  getAllJoyoKanjiData() {
    return new Promise((resolve, reject) => {
      db.getJouyouKanjiGrade()
        .then((rows) => {
          const kanjiData = rows.map((row) => {
            // Parse the concatenated strings back into objects
            const meanings = {};
            const readings = {};
            const nanoris = row.nanoris ? row.nanoris.split(",") : [];

            if (row.meanings) {
              row.meanings.split(",").forEach((item) => {
                const [lang, meaning] = item.split(":");
                if (!meanings[lang]) meanings[lang] = [];
                meanings[lang].push(meaning);
              });
            }

            if (row.readings) {
              row.readings.split(",").forEach((item) => {
                const [type, reading] = item.split(":");
                if (!readings[type]) readings[type] = [];
                readings[type].push(reading);
              });
            }

            return {
              kanji: row.kanji,
              unicode: row.unicode,
              grade: row.grade,
              stroke_count: row.stroke_count,
              freq: row.freq,
              jlpt: row.jlpt,
              heisig: row.heisig,
              meanings,
              readings,
              nanori: nanoris,
            };
          });

          resolve({ kanjis: kanjiData });
        })
        .catch((error) => {
          console.error(error);
          reject(new Error("Failed to fetch Joyo kanji data"));
        });
    });
  },
};

module.exports = kanjiController;
