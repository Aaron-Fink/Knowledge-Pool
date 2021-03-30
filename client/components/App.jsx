import React, { useState } from 'react';
import SearchBar from './SearchBar';
import DisplayCards from './DisplayCards';
import './styles/AppStyles.css';

const App = () => {
  //  initialize the cards parameter
  const [cards, setCards] = useState([]);

  return (
    <div className="app-container">
      <SearchBar
        setCards={setCards}
      />
      <div className="searchBar-colorbar" />
      <DisplayCards
        cards={cards}
      />
    </div>
  );
};

export default App;
