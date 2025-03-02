const xmlHelper = require("../kanjiXmlHelper/kanjiXmlHelper.js");
const kanjiController = require("../kanjidbHelper/kanjiController.js");

// =====================================================
// main Kanji api
// =====================================================
module.exports = function (app) {
  // lets parse the xml file and save it in memory to avoid having to reread it over and over again.

  // takes multiple kanjis as string
  // api/kanjisearch/kanjis/会社
  app.get("/api/kanjisearch/:kanjis?", function (req, res) {
    console.log("/api/kanjisearch/:kanji?");
    //console.log(req);
    if (req.params.kanjis === undefined)
      return res.json({ res: "Empty search parameter." });
    req.params.kanjis = req.params.kanjis.split("");
    if (!Array.isArray(req.params.kanjis))
      return res.json({ res: "Parameter not formatted correctly or Empty." });

    let requestedKanjis = req.params.kanjis;

    kanjiController
      .getKanjisByKanjis(requestedKanjis)
      .then((results) => {
        res.json(results);
      })
      .catch((err) => {
        res.json(err);
      });
  });

  // send one english word to get a kanji back
  // api/kanji/meaning/word
  app.get("/api/meaning/:meaning?", function (req, res) {
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
  app.get("/api/list/jouyou/:grade", function (req, res) {
    if (req.params.grade === undefined)
      return res.json({ res: "Empty search parameter." });
    let requestedKanjiGrade = parseInt(req.params.grade);
    if (
      requestedKanjiGrade < 1 ||
      requestedKanjiGrade > 9 ||
      isNaN(requestedKanjiGrade)
    )
      return res.json({ res: "Bad Parameters" });

    kanjiController
      .getJoyoKanjiDataByGrade(requestedKanjiGrade)
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
    if (
      requestedKanjiJLPT < 1 ||
      requestedKanjiJLPT > 4 ||
      isNaN(requestedKanjiJLPT)
    )
      return res.json({ res: "Bad Parameters" });

    kanjiController
      .getJlptKanjiDataByNLevel(requestedKanjiJLPT)
      .then((results) => {
        res.json(results);
      })
      .catch((err) => {
        res.json(err);
      });
  });

  // returns all jouyou kanji
  app.get("/api/list/jouyou", function (req, res) {
    kanjiController
      .getAllJoyoKanjiData()
      .then((results) => {
        res.json(results);
      })
      .catch((err) => {
        res.json(err);
      });
  });

  // returns all jlpt kanji
  app.get("/api/list/jlpt", function (req, res) {
    kanjiController
      .getAllJlptKanjiData()
      .then((results) => {
        res.json(results);
      })
      .catch((err) => {
        res.json(err);
      });
  });
};
