//import the knaji dic file 
const xml2js = require('xml2js');
const fs = require("fs");
var filePath = "kanjidic2.xml"


// this is a promise to get the kanji - 
// maybe didnt need a promise but didnt want to rewrite the fs.readfile more than twice
// also wanted to work with promises a bit. 
var parser = new xml2js.Parser({mergeAttrs: true, attrkey: "attr", charkey: "text", explicitArray: false});
const XMLtoJSON = new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', function(err, xml) {
        if (err) reject(err);
        parser.parseString(xml, function (err, result) {
            if (err) reject(err);
            let kanjidic = result.kanjidic2;
            resolve(kanjidic)
        });
    });
});

// Takes a kanjiOject from Parser and formats it to nice JSON that is easy to read and use. 
function formatCharacterObject(KanjiObject){
    let literal = KanjiObject.literal;
    let jouyoGrade = KanjiObject.misc.grade;
    let strokeCount = KanjiObject.misc.stroke_count;
    let frequency = KanjiObject.misc.freq;
    let jlptLevel = KanjiObject.misc.jlpt;
    let unicode = KanjiObject.codepoint.cp_value[0].text
    let englishMeanings = getEnglishMeaningsFromKanjiObject(KanjiObject)
    let nonEnglishMeanings = getNonEnglishMeaningsFromKanjiObject(KanjiObject)
    let allMeanings;
    if (nonEnglishMeanings != undefined) {
        allMeanings = {...englishMeanings, ...nonEnglishMeanings} //merge objects with spread operator (or Object.assign())
    } else {
        allMeanings = englishMeanings;
    }
    let allReadings = getAllReadings(KanjiObject);
    let allNanori = getAllNanori(KanjiObject);
    
    //format the character into a something cleaner to send back to front end or api
    let character = {
        kanji: literal,
        unicode: unicode,
        grade: jouyoGrade,
        stroke_count: strokeCount,
        freq: frequency,
        jlpt: jlptLevel,
        heisig: "1",
        heisig6thEdition: "2",
        meanings: allMeanings,
        readings: allReadings,
        nanori: allNanori
      }

    return character;
};

// this takes a single kanjiObject that has been parsed from xml2js 
// returns an object of nanori
// {nanori: [readings]}
function getAllNanori(KanjiObject){
    let nanori = KanjiObject.reading_meaning.nanori
    if(typeof nanori === "string") {
        return [nanori];
    } else {
        return nanori
    }
}

// this takes a single kanjiObject that has been parsed from xml2js 
// returns an object of readings
// {pinyin: [reading]}
function getAllReadings(KanjiObject){
    if(KanjiObject.reading_meaning.rmgroup.reading == undefined) return;
    let readings = KanjiObject.reading_meaning.rmgroup.reading
    if (!Array.isArray(readings)){ // if there is one value just return it. 
        return readings;
    }
    let formattedObject = {}
    readings.map(meaning => {
        if(formattedObject[meaning.r_type] === undefined){
            formattedObject[meaning.r_type] = [meaning.text];
        } else {
            formattedObject[meaning.r_type].push(meaning.text)
        }
    })
    return formattedObject;
}

// this takes a single kanjiObject that has been parsed from xml2js 
// returns an object of english meanings
// {en: [meanings]}
function getEnglishMeaningsFromKanjiObject(KanjiObject){
    let meanings = KanjiObject.reading_meaning.rmgroup.meaning
    if (!Array.isArray(meanings)){
        return meanings;
    }
    let englishMeanings = meanings.filter(meaning => typeof meaning ==="string")
    let englsihObject = {en: englishMeanings}
    return englsihObject;
}

// this takes a single kanjiObject that has been parsed from xml2js 
// returns an object of Non-english meanings
// {  fr: [ french ], es: [ spanish ] }
function getNonEnglishMeaningsFromKanjiObject(KanjiObject){
    let meanings = KanjiObject.reading_meaning.rmgroup.meaning
    if (!Array.isArray(meanings)) return;
    let nonEnglishMeanings = meanings.filter(meaning => typeof meaning != "string") //filters out non English
    let formattedObject = {}
    nonEnglishMeanings.map(meaning => {
        if(formattedObject[meaning.m_lang] === undefined){
            formattedObject[meaning.m_lang] = [meaning.text];
        } else {
            formattedObject[meaning.m_lang].push(meaning.text)
        }
    })
    return formattedObject;
}

// ------------------------------------------------------------------------- 
// These are the functions that will return stuff to api call
const kanjiXml = {
    // function to get info on single kanji
    getKanjiInfo: (kanji) => {
        return new Promise((resolve, reject) => {
            XMLtoJSON.then((results) => {
                for(let i = 0; i<results.character.length; i++){
                    if(results.character[i].literal[0] === kanji){
                        const formattedKanjiJSON = formatCharacterObject(results.character[i]);
                        return resolve(formattedKanjiJSON);
                    }
                }
                reject("No Kanji Found")
            })
        })
    },

    // create function to get info on multiple kanji 
    // kanjis = array of kanji
    // each element must be a kanji character. 
    getKanjisInfo: (kanjis) => {
        return new Promise((resolve) => {
            XMLtoJSON.then((results) => {
                let kanjisInfo = []
                kanjis.forEach(kanji => { // for each kanji passed queried by client.
                    for(let i = 0; i<results.character.length; i++){ // loop through entire kanji list
                        if(results.character[i].literal[0] === kanji){ // if there is a match push into kanjisInfo array
                            const formattedKanjiJSON = formatCharacterObject(results.character[i]);
                            kanjisInfo.push(formattedKanjiJSON);
                        }
                    }
                });
                resolve({kanjisInfo})
            })
        })
    },

    // create function to get kanjis with certain grade 
    // grade 1-6 is jouyou kyouiku kanji
    // grade 8 is the remaing jouyou knaji.
    // 9 indicates it is a Jinmeiyou
    getKanjiByGrade(gradeLevel){
        return new Promise((resolve) => {
            XMLtoJSON.then((results) => {
                let kanjisInfo = []
                for(let i = 0; i<results.character.length; i++){
                    if(results.character[i].misc.grade != undefined && parseInt(results.character[i].misc.grade) === gradeLevel){
                        const formattedKanjiJSON = formatCharacterObject(results.character[i]);
                        kanjisInfo.push(formattedKanjiJSON);
                    }
                }
                resolve({kanjisInfo})
            })
        })
    },

    // create function to get kanjis with certain jlpt 
    // uses the pre-2010 level of the Japanese Language Proficiency Test (JLPT) in which the kanji occurs (1-4).
    getKanjiByJLPTn(jlptLevel){
        return new Promise((resolve) => {
            XMLtoJSON.then((results) => {
                let kanjisInfo = []
                for(let i = 0; i<results.character.length; i++){
                    if(results.character[i].misc.jlpt != undefined && parseInt(results.character[i].misc.jlpt) === jlptLevel){
                        const formattedKanjiJSON = formatCharacterObject(results.character[i]);
                        kanjisInfo.push(formattedKanjiJSON);
                    }
                }
                resolve({kanjisInfo})
            })
        })
    },

    // create function to get kanjis with certain grade 
    // grade 1-8 is jouyou kanji
    getKanjiAllJoyoKanji(){
        return new Promise((resolve) => {
            XMLtoJSON.then((results) => {
                let kanjisInfo = []
                for(let i = 0; i<results.character.length; i++){
                    if(results.character[i].misc.grade != undefined && parseInt(results.character[i].misc.grade) < 9){
                        const formattedKanjiJSON = formatCharacterObject(results.character[i]);
                        kanjisInfo.push(formattedKanjiJSON);
                    }
                }
                resolve({kanjisInfo})
            })
        })
    },

    // create function to get kanjis with certain jlpt 
    // uses the pre-2010 level of the Japanese Language Proficiency Test (JLPT) in which the kanji occurs (1-4).
    getKanjiAllJlptKanji(){
        return new Promise((resolve) => {
            XMLtoJSON.then((results) => {
                let kanjisInfo = []
                for(let i = 0; i<results.character.length; i++){
                    if(results.character[i].misc.jlpt != undefined){
                        const formattedKanjiJSON = formatCharacterObject(results.character[i]);
                        kanjisInfo.push(formattedKanjiJSON);
                    }
                }
                resolve({kanjisInfo})
            })
        })
    },

    // create function to get kanji based on english word - heisig word or meaning. 
    getKanjiFromMeaning(meaning){
        return new Promise((resolve) => {
            XMLtoJSON.then((results) => {
                //return kanji with a meaning of heisigWord
                let kanjisInfo = []
                for(let i = 0; i<results.character.length; i++){
                    if(results.character[i].reading_meaning != undefined && results.character[i].reading_meaning.rmgroup.meaning != undefined){
                        if(typeof results.character[i].reading_meaning.rmgroup.meaning === "string"){ // if its a string that means only one meaning. 
                            if(results.character[i].reading_meaning.rmgroup.meaning === meaning){
                                console.log(results.character[i].reading_meaning.rmgroup.meaning)
                                const formattedKanjiJSON = formatCharacterObject(results.character[i]);
                                kanjisInfo.push(formattedKanjiJSON);
                            }
                        } else { // if its an array of meanings we loop through it. 
                            for(let j = 0; j<results.character[i].reading_meaning.rmgroup.meaning.length; j++){
                                if (results.character[i].reading_meaning.rmgroup.meaning[j] === meaning){
                                    const formattedKanjiJSON = formatCharacterObject(results.character[i]);
                                    kanjisInfo.push(formattedKanjiJSON);
                                }
                            }
                        }
                    }
                }
                resolve({kanjisInfo})
            })
        })
    },


}

// TO-DO: write unit tests for each of these methods. ( use mocha or someother testing library. )
// kanjiXml.getKanjisInfo(['謜', '薇', '漢', '字', '亜'])
// kanjiXml.getKanjiInfo("亜")
// kanjiXml.getKanjiByGrade(7)
// kanjiXml.getKanjiByJLPTn(4)
// kanjiXml.getKanjiAllJoyoKanji()
// kanjiXml.getKanjiAllJlptKanji()
// kanjiXml.getKanjiFromMeaning("one")

module.exports = kanjiXml;

// list of kanji that has broke something and needs to be tested. 
// 巢 
// 謜
// 薇