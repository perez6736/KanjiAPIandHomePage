import React from "react";

class Header extends React.Component {
  render() {
    return (
      <div className="ui container">
        <a href="#" className="header item">
          <img src={require("../images/ji.png")} />
        </a>
      </div>
    );
  }
}

export default Header;
