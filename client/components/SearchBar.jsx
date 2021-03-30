/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import axios from 'axios';
import './styles/SearchBarStyles.css';

//  function to
const SearchBar = ({ setCards }) => {
  //  state of the user inputed query
  const [searchTerm, setSearch] = useState('');

  //  Upon the user submitting their query for results
  //  Pass the searched term to the parent function to display the results on the QueryResultPage
  const handleSubmit = (event) => {
    event.preventDefault();
    //  sends a get request to the server looking for all cards that match a specific term
    //  updates the list cardQuery to show the results
    axios.get('http://localhost:3000/api/search', { params: { term: searchTerm } })
      .then((results) => {
        const uniqueCards = [];
        const seenCards = {};
        for (let i = 0; i < results.data.length; i += 1) {
          if (seenCards[results.data[i].name] !== true) {
            uniqueCards.push(results.data[i]);
            seenCards[results.data[i].name] = true;
          }
        }
        setCards(uniqueCards);
      })
      .catch((err) => console.log(err));
  };

  //  render the search bar and the search bar button to the screen
  return (
    <div className="searchBar-container">
      <form className="searchBar-form" onSubmit={handleSubmit}>
        <input type="text" className="searchBar-input" value={searchTerm} onChange={(event) => setSearch(event.target.value)} />
        <button type="submit" className="searchBar-button">Search</button>
      </form>
    </div>
  );
};

export default SearchBar;
