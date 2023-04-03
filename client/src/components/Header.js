import React from "react";

class Header extends React.Component {
  render() {
    return (
      <div className="ui container">
        <div className="header item">
          <img alt="kanjiIcon" src={require("../images/ji.png")} />
        </div>
      </div>
    );
  }
}

export default Header;
