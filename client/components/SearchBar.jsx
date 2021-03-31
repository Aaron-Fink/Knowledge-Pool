/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import axios from 'axios';
import './styles/SearchBarStyles.css';

//  function to
const SearchBar = ({
  setCards, setFilter, setquery, setMoreCards,
}) => {
  //  state of the user inputed query
  const [searchTerm, setSearch] = useState('');

  //  Upon the user submitting their query for results
  //  Pass the searched term to the parent function to display the results on the QueryResultPage
  const handleSubmit = (event) => {
    event.preventDefault();
    setquery(searchTerm);
    //  sends a get request to the server looking for all cards that match a specific term
    //  updates the list cardQuery to show the results
    axios.get('/api/search', { params: { term: searchTerm } })
      .then((results) => {
        if (results.data === 'Not Found') {
          setCards([]);
        } else {
          if (results.data.length === 175) {
            setMoreCards(true);
          } else {
            setMoreCards(false);
          }
          setCards(results.data);
        }
      })
      .catch((err) => console.log(err));
  };

  //  render the search bar and the search bar button to the screen
  return (
    <div className="searchBar-container">
      <form className="searchBar-form" onSubmit={handleSubmit}>
        <input type="text" className="searchBar-input" value={searchTerm} onChange={(e) => setSearch(e.target.value)} />
        <button type="submit" className="searchBar-button">Search</button>
      </form>
      <button type="button" onClick={() => setFilter(true)}>Filter</button>
    </div>
  );
};

export default SearchBar;
