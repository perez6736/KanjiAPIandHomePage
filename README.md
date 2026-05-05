# Japanese Kanji API

A REST API for retrieving information about Japanese kanji characters.

**Live API:**  
https://japanese-kanji-api.onrender.com/

> Note: Hosted on Render free tier. First request may be slow due to cold start.

---

## Overview

This API provides structured kanji data including:

- Meanings (English + other languages)
- Readings (On/Kun)
- Stroke count
- JLPT level
- Jouyou grade
- Frequency
- Heisig number
- Nanori (name readings)

---

## Tech Stack

### Backend
- Node.js
- Express.js

### Frontend
- React.js (used to test and interact with the API)

### Data Source
- KANJIDIC2 (XML)
- EDICT  

Provided by:  
Electronic Dictionary Research and Development Group (EDRDG)  
http://www.edrdg.org/wiki/index.php/Main_Page

---

## API Endpoints

### Search by Kanji

**GET** `/api/kanjisearch/:kanjis`

**Example:**  
`/api/kanjisearch/会社`

**Description:**
- Takes a string of kanji
- Splits into individual characters
- Returns data for each

---

### Search by English Meaning

**GET** `/api/meaning/:meaning`

**Example:**  
`/api/meaning/china`

**Description:**
- Returns kanji matching the meaning

---

### Jouyou Kanji by Grade

**GET** `/api/list/jouyou/:grade`

**Example:**  
`/api/list/jouyou/3`

---

### JLPT Kanji by Level

**GET** `/api/list/jlpt/:jlptLevel`

**Example:**  
`/api/list/jlpt/3`

---

### All Jouyou Kanji

**GET** `/api/list/jouyou`

---

### All JLPT Kanji

**GET** `/api/list/jlpt`

---

## How It Works

- KANJIDIC2 XML file is parsed once at startup
- Data is stored in memory for fast lookups
- API filters and formats results into clean JSON

---

## Local Development

### Install dependencies

```bash
npm install
```

### Run the server

```bash
node server.js
```

### Access locally

```text
http://localhost:PORT/api/kanjisearch/漢字
```

---

## Notes

- First request on hosted API may be slow (cold start)
- Matching is exact (no fuzzy search)
- Entire dataset is loaded into memory for performance

---

## Future Improvements

- Fuzzy search
- Pagination
- Caching layer
- Unit tests (Mocha / Jest)
- Improved frontend UI

---

## Data Attribution

This project uses dictionary data from:

Electronic Dictionary Research and Development Group (EDRDG)  
http://www.edrdg.org/wiki/index.php/Main_Page

Please review their licensing terms before using this data commercially.
```
