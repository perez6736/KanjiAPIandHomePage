import React from "react";
import "./SearchBar.css";

class SearchBar extends React.Component {
  state = { term: "" };

  onInputChange = (event) => {
    this.setState({ term: event.target.value });
  };

  onFormSubmit = (event) => {
    event.preventDefault();

    this.props.onTermSubmit(this.state.term);
  };

  render() {
    return (
      <form className="ui segment" onSubmit={this.onFormSubmit}>
        <div className="ui fluid input">
          <div className="ui label">
            <span id="baseURL-kanji-api" className="label-text">
              https://BaseURL.com/api/
            </span>
          </div>
          <input
            id="kanji-api-input"
            className="input-placeholder-text"
            type="text"
            onChange={this.onInputChange}
          />
        </div>
      </form>
    );
  }
}

export default SearchBar;
