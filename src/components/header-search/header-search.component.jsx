import React, { Component } from "react";
import { connect } from "react-redux";
import { updateSearchQuery, searchYoutube } from "../../redux/actions/search";
import { showNotification } from "../../redux/actions/notifications";
import style from "./header-search.module.css";

class HeaderSearch extends Component {
  updateSearchQuery = e => {
    this.props.updateSearchQuery(e.target.value);
  };

  submit = e => {
    e.preventDefault();
    this.search();
  };

  inputKeyDown = e => {
    e.key === "Enter" && this.search();
  };

  search = () => {
    if (this.props.keyword.length < 1) {
      this.props.showNotification({
        type: "warning",
        message: "Please enter a keyord to search"
      });
      return;
    }
    this.props.searchYoutube(this.props.keyword);
  };

  render() {
    return (
      <div className="field has-addons">
        <div className="control">
          <input
            className={`input ${style.searchInputStyle}`}
            type="search"
            placeholder="Find a video"
            value={this.props.keyword}
            onChange={this.updateSearchQuery}
            onKeyDown={this.inputKeyDown}
          />
        </div>
        <div className="control">
          <a
            href="/"
            className={`button is-info ${style.searchButtonStyle}`}
            onClick={this.submit}
          >
            <i className="fas fa-search"></i>
          </a>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    keyword: state.keyword
  };
};

export default connect(mapStateToProps, {
  updateSearchQuery,
  searchYoutube,
  showNotification
})(HeaderSearch);
