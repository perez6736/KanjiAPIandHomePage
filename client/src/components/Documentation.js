import React from "react";

class Documentation extends React.Component {
  render() {
    return (
      <div>
        <h4 className="ui horizontal divider header">Documentation</h4>

        <h2> search/&#123;Kanji&#125; </h2>
        <p> this is a description of the end point</p>
        <div className="ui segment">
          <div className="ui vertical segment">
            <div class="ui three column very relaxed grid">
              <div class="column">
                <p>Field</p>
              </div>
              <div class="column">
                <p>Type</p>
              </div>
              <div class="column">
                <p>Description</p>
              </div>
            </div>
            <div class="ui divider"></div>
            <div class="ui three column very relaxed grid">
              <div class="column">
                <p>Field1</p>
              </div>
              <div class="column">
                <p>Type1</p>
              </div>
              <div class="column">
                <p>Description1</p>
              </div>
            </div>
            <div class="ui divider"></div>
            <div class="ui three column very relaxed grid">
              <div class="column">
                <p>Field2</p>
              </div>
              <div class="column">
                <p>Type2</p>
              </div>
              <div class="column">
                <p>Description2</p>
              </div>
            </div>
            <div class="ui divider"></div>
            <div class="ui three column very relaxed grid">
              <div class="column">
                <p>Field3</p>
              </div>
              <div class="column">
                <p>Type3</p>
              </div>
              <div class="column">
                <p>Description3</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Documentation;
