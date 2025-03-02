const db = require("./kanjiDBsql");

function formatRowsToJSON(rows) {
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
  return kanjiData;
}

const kanjiController = {
  getAllJoyoKanjiData() {
    return new Promise((resolve, reject) => {
      db.getAllJouyouKanji()
        .then((rows) => {
          const kanjiData = formatRowsToJSON(rows);
          resolve({ kanjis: kanjiData });
        })
        .catch((error) => {
          console.error(error);
          reject(new Error("Failed to fetch Joyo kanji data"));
        });
    });
  },

  getJoyoKanjiDataByGrade(grade) {
    return new Promise((resolve, reject) => {
      db.getJouyouKanjiByGrade(grade)
        .then((rows) => {
          const kanjiData = formatRowsToJSON(rows);
          resolve({ kanjis: kanjiData });
        })
        .catch((error) => {
          console.error(error);
          reject(new Error("Failed to fetch Joyo kanji data"));
        });
    });
  },

  getAllJlptKanjiData() {
    return new Promise((resolve, reject) => {
      db.getAllJlptKanji()
        .then((rows) => {
          const kanjiData = formatRowsToJSON(rows);
          resolve({ kanjis: kanjiData });
        })
        .catch((error) => {
          console.error(error);
          reject(new Error("Failed to fetch Joyo kanji data"));
        });
    });
  },
  getJlptKanjiDataByNLevel(NLevel) {
    return new Promise((resolve, reject) => {
      db.getJlptKanjiByNlevel(NLevel)
        .then((rows) => {
          const kanjiData = formatRowsToJSON(rows);
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
