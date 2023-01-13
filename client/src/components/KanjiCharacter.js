import React from "react";

const KanjiCharacter = ({ kanji }) => {
  //props.videos
  return (
    <div className="content">
      <div className="header"> {kanji.kanji} </div>
    </div>
  );
};

export default KanjiCharacter;
