const fs = require("fs");
const path = require("path");
const xml2js = require("xml2js");
const sqlite3 = require("sqlite3").verbose();

// Define the XML file path
const xmlFile = path.join(__dirname, "../../", "kanjidic2.xml"); // Adjust path if needed
const parser = new xml2js.Parser();

// Connect to SQLite database
const db = new sqlite3.Database(path.join(__dirname, "kanji.db"), (err) => {
  if (err) console.error("Database connection error:", err);
  else console.log("Connected to SQLite database.");
});

// Read and parse XML file
fs.readFile(xmlFile, "utf8", (err, data) => {
  if (err) throw err;

  parser.parseString(data, (err, result) => {
    if (err) throw err;

    const characters = result.kanjidic2.character;

    db.serialize(() => {
      const insertKanji = db.prepare(
        "INSERT INTO kanji (kanji, unicode, grade, stroke_count, freq, jlpt, heisig) VALUES (?, ?, ?, ?, ?, ?, ?)"
      );
      const insertMeaning = db.prepare(
        "INSERT INTO meanings (kanji, language, meaning) VALUES (?, ?, ?)"
      );
      const insertReading = db.prepare(
        "INSERT INTO readings (kanji, type, reading) VALUES (?, ?, ?)"
      );
      const insertNanori = db.prepare(
        "INSERT INTO nanori (kanji, nanori) VALUES (?, ?)"
      );

      let pendingInserts = characters.length; // Track pending operations

      characters.forEach((char) => {
        const literal = char.literal?.[0] || "";
        const unicode =
          char.codepoint?.[0]?.cp_value?.[0]?._ ||
          char.codepoint?.[0]?.cp_value?.[0] ||
          "";
        const grade = char.misc?.[0]?.grade?.[0] || null;
        const stroke_count = char.misc?.[0]?.stroke_count?.[0] || null;
        const freq = char.misc?.[0]?.freq?.[0] || null;
        const jlpt = char.misc?.[0]?.jlpt?.[0] || null;
        const heisig =
          char.dic_number?.[0]?.dic_ref?.find(
            (ref) => ref.$.dr_type === "heisig"
          )?.["_"] || null;

        insertKanji.run(
          [literal, unicode, grade, stroke_count, freq, jlpt, heisig],
          function (err) {
            if (err) console.error("Insert Kanji Error:", err);

            if (char.reading_meaning?.[0]?.rmgroup?.[0]?.meaning) {
              char.reading_meaning[0].rmgroup[0].meaning.forEach((m) => {
                const language = m.$?.m_lang || "en";
                insertMeaning.run([literal, language, m._ || m]);
              });
            }

            if (char.reading_meaning?.[0]?.rmgroup?.[0]?.reading) {
              char.reading_meaning[0].rmgroup[0].reading.forEach((r) => {
                const type = r.$.r_type;
                insertReading.run([literal, type, r._]);
              });
            }

            if (char.reading_meaning?.[0]?.nanori) {
              char.reading_meaning[0].nanori.forEach((n) => {
                insertNanori.run([literal, n]);
              });
            }

            pendingInserts--; // Decrease pending count

            // When all inserts are done, finalize statements
            if (pendingInserts === 0) {
              insertKanji.finalize();
              insertMeaning.finalize();
              insertReading.finalize();
              insertNanori.finalize();
              console.log("All data inserted successfully.");
              db.close();
            }
          }
        );
      });
    });
  });
});
