import React from "react";
import "./KanjiResponse.css";

const KanjiResponse = ({ kanjiInfo }) => {
  //this is just a simple text box that will display the prop kanji in json.
  // parse the json into a string and display?
  return (
    <div className="ui raised segment" id="JSON-response-container">
      <pre className="json-data">{JSON.stringify(kanjiInfo, null, 2)}</pre>
    </div>
  );
};

export default KanjiResponse;
