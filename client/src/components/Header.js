import React from "react";

class Header extends React.Component {
  render() {
    return (
      <div className="ui container">
        <a href="#" className="header item" aria-label="Site logo">
          <img src={require("../images/ji.png")} alt="Site logo" />
        </a>
      </div>
    );
  }
}

export default Header;
