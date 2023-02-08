import React from "react";
import "./Documentation.css";

class Documentation extends React.Component {
  render() {
    return (
      <div>
        <h4 className="ui horizontal divider header">Documentation</h4>

        <h2> search/&#123;Kanji&#125; </h2>
        <p> this is a description of the end point</p>
        <div className="ui segment">
          <div className="ui vertical segment">
            <div className="ui three column very relaxed grid">
              <div className="column">
                <p>Field</p>
              </div>
              <div className="column">
                <p>Type</p>
              </div>
              <div className="column">
                <p>Description</p>
              </div>
            </div>
            <div className="ui divider"></div>
            <div className="ui three column very relaxed grid">
              <div className="column">
                <p>Field1</p>
              </div>
              <div className="column">
                <p>Type1</p>
              </div>
              <div className="column">
                <p>Description1</p>
              </div>
            </div>
            <div className="ui divider"></div>
            <div className="ui three column very relaxed grid">
              <div className="column">
                <p>Field2</p>
              </div>
              <div className="column">
                <p>Type2</p>
              </div>
              <div className="column">
                <p>Description2</p>
              </div>
            </div>
            <div className="ui divider"></div>
            <div className="ui three column very relaxed grid">
              <div className="column">
                <p>Field3</p>
              </div>
              <div className="column">
                <p>Type3</p>
              </div>
              <div className="column">
                <p>Description3</p>
              </div>
            </div>
          </div>
        </div>

        <h4 className="ui horizontal divider header"></h4>

        <div className="gridcontainer">
          <div className="header"> This is the header </div>
          <div className="desc"> This is the description </div>
          <div className="param"> This is the parameter type </div>
          <div class="ResponseContainer">
            <div class="ResponseHeader">response header 1.</div>
            <div class="ResponseHeader">response header 2.</div>
            <div class="ResponseHeader">response header 3.</div>
            <div class="ResponseDetailContaier">
              <div class="ResponseDetail">response header 1.</div>
              <div class="ResponseDetail">response header 2.</div>
              <div class="ResponseDetail">response header 3.</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Documentation;
