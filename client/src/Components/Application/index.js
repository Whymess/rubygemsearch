import React, { Component } from "react";
import {
  Title,
  Searchbar,
  GemPaper,
  Loader,
  ModalViewSaved
} from "../../Components/";

export default class Application extends Component {
  state = {
    searchTerm: "",
    error: "",
    response: "",
    loading: false,
    savedResponse: ""
  };

  handleChange = e => {
    let { value } = e.target;
    this.setState({ searchTerm: value, error: "" });
  };

  onSumbit = () => {
    let { searchTerm } = this.state;
    this.setState({
      loading: true
    });
    fetch(`/api/v1/search.json?query=${searchTerm}`, {
      method: "GET",
      headers: {
        Accept: "application/json"
      }
    })
      .then(response => response.json())
      .then(response => {
        this.setState(
          {
            response,
            loading: false
          },
          () => {
            this.renderResponse();
          }
        );
      })
      .catch(response => {
        this.setState({
          error: "There was an error fetching.... Please try again later"
        });
      });
  };

  renderResponse = () => {
    let { response } = this.state;
    return (
      response &&
      response.map((el, i) => {
        return <GemPaper key={i} {...el} />;
      })
    );
  };

  handleKeyPress = e => {
    let { searchTerm } = this.state;
    if (e.key === "Enter") {
      if (searchTerm.length !== 0) {
        this.onSumbit(searchTerm);
        this.setState({
          searchTerm: ""
        });
      } else {
        this.setState({
          error: "You need to enter a search term!"
        });
      }
    }
  };

  retriveSavedGems = () => {

  }



  render() {
    let { searchTerm, error, loading } = this.state;
    return (
      <div className="application">
        <nav className="navbar navbar-dark bg-dark">
          <button type="button" onClick={this.retriveSavedGems}
          className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
              Launch demo modal
        </button>
        </nav>
        <div className="container d-flex justify-content-center flex-column">
          <Title title="Find, and save RubyGems." />
          <Searchbar
            error={error}
            value={searchTerm}
            handleChange={this.handleChange}
            handleKeyPress={this.handleKeyPress}
          />
        </div>

        <div className="container d-flex justify-content-center flex-column">
          {this.renderResponse()}
          {loading ? <Loader /> : ""}
        </div>
        <ModalViewSaved/>
       
      </div>
    );
  }
}
