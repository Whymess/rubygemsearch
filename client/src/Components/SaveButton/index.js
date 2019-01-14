import React, { Component } from "react";

export default class SaveButton extends Component {
  state = {
    saved: false,
    data: ""
  };

  saveGem = () => {
    var { name, info, authors, sha } = this.props.props;
    var data = {
      name,
      info,
      authors,
      sha
    };
    this.setState({
      data
    });

    fetch("/savedGems", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    this.setState(prevState => ({
      saved: !prevState.saved
    }));
  };

  removeSavedGem = () => {
    let { data } = this.state;
    fetch("http://localhost:8080/savedGems", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    this.setState(prevState => ({
      saved: !prevState.saved
    }));
  };

  render() {
    let { saved } = this.state;
    if (!saved) {
      return (
        <button
          type="button"
          onClick={this.saveGem}
          className="btn btn-success"
        >
          Save
        </button>
      );
    }
    return (
      <button
        onClick={this.removeSavedGem}
        type="button"
        className="btn btn-secondary"
      >
        Saved!
      </button>
    );
  }
}
