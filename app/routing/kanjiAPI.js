const xmlHelper = require("../kanjiXmlHelper/kanjiXmlHelper.js");

// =====================================================
// main Kanji api
// =====================================================
module.exports = function (app) {
  // takes in a single character and returns info on it
  // api/kanji/search/字
  app.get("/api/kanjisearch/:kanjiCharacter?", function (req, res) {
    if (req.params.kanjiCharacter === undefined)
      return res.json({ res: "Empty search parameter." });

    let requestedKanjis = req.params.kanjiCharacter;

    xmlHelper
      .getKanjiInfo(requestedKanjis)
      .then((results) => {
        res.json(results);
      })
      .catch((err) => {
        res.status(204).send(err);
      });
  });

  // takes multiple kanjis as string
  // api/kanji/kanjis?kanji=漢字
  app.get("/api/kanjisearch/kanjis", function (req, res) {
    req.query.kanji = req.query.kanji.split("");
    console.log(req.query.kanji);
    if (!Array.isArray(req.query.kanji))
      return res.json({ res: "Parameter not formatted correctly or Empty." });

    let requestedKanjis = req.query.kanji;

    xmlHelper
      .getKanjisInfo(requestedKanjis)
      .then((results) => {
        res.json(results);
      })
      .catch((err) => {
        res.json(err);
      });
  });

  // send one english word to get a kanji back
  // api/kanji/meaning/word
  app.get("/api/wordsearch/meaning/:meaning?", function (req, res) {
    if (req.params.meaning === undefined)
      return res.json({ res: "Empty search parameter." });

    let requestedKanjiMeaning = req.params.meaning;

    xmlHelper
      .getKanjiFromMeaning(requestedKanjiMeaning)
      .then((results) => {
        res.json(results);
      })
      .catch((err) => {
        res.json(err);
      });
  });

  // enter a grade as a string and returns the jouyou grade
  // api.kanji.grade/3
  app.get("/api/list/grade/:grade?", function (req, res) {
    if (req.params.grade === undefined)
      return res.json({ res: "Empty search parameter." });
    let requestedKanjiGrade = parseInt(req.params.grade);
    if (
      requestedKanjiGrade < 1 ||
      requestedKanjiGrade > 9 ||
      isNaN(requestedKanjiGrade)
    )
      return res.json({ res: "Bad Parameters" });

    xmlHelper
      .getKanjiByGrade(requestedKanjiGrade)
      .then((results) => {
        res.json(results);
      })
      .catch((err) => {
        res.json(err);
      });
  });

  // enter a jlpt as a string and returns the jlpt grade
  // api.kanji.jlpt/3
  app.get("/api/list/jlpt/:jlptLevel", function (req, res) {
    let requestedKanjiJLPT = parseInt(req.params.jlptLevel);
    console.log(requestedKanjiJLPT);
    if (
      requestedKanjiJLPT < 1 ||
      requestedKanjiJLPT > 4 ||
      isNaN(requestedKanjiJLPT)
    )
      return res.json({ res: "Bad Parameters" });

    xmlHelper
      .getKanjiByJLPTn(requestedKanjiJLPT)
      .then((results) => {
        res.json(results);
      })
      .catch((err) => {
        res.json(err);
      });
  });

  // returns all jouyou kanji
  app.get("/api/list/jouyou", function (req, res) {
    xmlHelper
      .getKanjiAllJoyoKanji()
      .then((results) => {
        res.json(results);
      })
      .catch((err) => {
        res.json(err);
      });
  });

  // returns all jlpt kanji
  app.get("/api/list/jlpt", function (req, res) {
    xmlHelper
      .getKanjiAllJlptKanji()
      .then((results) => {
        res.json(results);
      })
      .catch((err) => {
        res.json(err);
      });
  });
};
