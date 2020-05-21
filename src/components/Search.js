import React from "react";
import "../Search.css";
import axios from "axios";

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      query: "",
      results: [],
      search: "",
    };
  }

  handleOnInputChange = (event) => {
    const query = event.target.value;
    this.setState({ query: query }, () => {
      if (this.state.query.length !== "" && this.state.query) {
        this.fetchSearchResults(query);
      } else {
        this.setState(() => ({
          results: [], //empties the result array so no suggestions show
        }));
      }
    });
  };

  fetchSearchResults = (query) => {
    const searchUrl = `http://localhost:3000/all?q=${query}`;
    axios
      .get(searchUrl, { headers: { "Access-Control-Allow-Origin": "*" } })
      .then((responses) => {
        console.log(responses.data);
        this.setState({
          results: responses.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //when the user clickes on the suggestion
  itemSelected(value) {
    this.setState(() => ({
      query: value,
      results: [], //empties the result array so no suggestions show
    }));
  }

  //when the user clickes on the enter button
  submitHandler = (event) => {
    axios
      .post(`http://localhost:3000/all?q=`, { search: this.state.query })
      .then((response) => {
        console.log(response);
        this.setState(() => ({
          query: "", //clearns the query
          results: [], //empties the results array so no suggestions show
        }));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const query = this.state.query;
    return (
      <div className="container">
        <h1 className="heading">Search</h1>
        <label className="search-label" htmlFor="search-input">
          <input
            className="input-label"
            type="text"
            value={query}
            name="query"
            id="search-input"
            placeholder="Search..."
            onChange={this.handleOnInputChange}
          />
          <ul className="ul-list">
            {/*displays the suggstions to the user*/}
            {this.state.results.map((item, index) => (
              <li
                className="li-list"
                key={index}
                onClick={() => this.itemSelected(item.search)}
              >
                {item.search}
              </li>
            ))}
          </ul>
        </label>
        <button className="submit-button" onClick={() => this.submitHandler()}>
          Submit
        </button>
      </div>
    );
  }
}
export default Search;
