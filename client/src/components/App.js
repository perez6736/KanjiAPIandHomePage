import React from "react";
import Header from "./Header.js";
import SearchBar from "./SearchBar";
import KanjiResponse from "./KanjiResponse";
import Documentation from "./Documentation.js";
import kanji from "../api/kanji";
import "./App.css";

class App extends React.Component {
  state = { kanjiInfo: [] };

  //default search term.
  componentDidMount() {
    this.onTermSubmit("search/漢");
  }

  /* searchable terms.
  search/漢 - Kanji (only one)
  kanjis?kanji=漢字 - Kanjis (multple is okay)
  meaning/word (string)
  grade/1 (int)
  jlpt/3 (int)
  jouyou (returns all jouyou kanji)
  jlpt (returns all jlpt kanji)
 */

  onTermSubmit = async (term) => {
    this.setState({
      kanjiInfo: "Loading... ",
    });

    const response = await kanji
      .get(term, {})
      .then((res) => {
        this.setState({
          kanjiInfo: res.data,
        });
      })
      .catch((error) => {
        this.setState({
          kanjiInfo: error.message,
        });
      });
  };

  render() {
    return (
      <div className="body">
        <div className="ui fixed inverted menu">
          <Header />
        </div>
        <div className="ui main container">
          <SearchBar onTermSubmit={this.onTermSubmit} />
          <div>
            Try other calls like /api/kanji/kanjis?kanji=漢字 or
            /api/kanji/meaning/chopsticks
          </div>
          <KanjiResponse kanjiInfo={this.state.kanjiInfo} />
          <div>
            <Documentation />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
