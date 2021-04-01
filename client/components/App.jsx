import React, { useState, useRef } from 'react';
import axios from 'axios';
import SearchBar from './SearchBar';
import DisplayCards from './DisplayCards';
import ExpandCard from './expanded/ExpandCard';
import FilterMenu from './expanded/FilterMenu';
import './styles/AppStyles.css';
import image from '../../public/franticsearch.jpg';
import yasharn from '../../public/yasharn.jpg';

const App = () => {
  //  initialize the cards parameter
  const [cards, setCards] = useState([]);
  const [expand, setExpand] = useState(null);
  const [filter, setFilter] = useState(false);
  const [query, setquery] = useState('');
  const [page, setPage] = useState(2);
  const [moreCards, setMoreCards] = useState(false);
  const [triggerRequest, setTriggerRequest] = useState(true);
  const scroll = useRef(null);

  return (
    <div
      className="app-container"
      onScroll={(e) => {
        if (e.target.scrollHeight / e.target.scrollTop < 1.3 && moreCards && triggerRequest) {
          setTriggerRequest(false);
          axios.get('/api/scroll', { params: { page, query } })
            .then((results) => {
              if (results.data.length === 175) {
                setPage(page + 1);
                setMoreCards(true);
                setTriggerRequest(true);
              } else {
                setMoreCards(false);
                setTriggerRequest(false);
              }
              const tempCards = cards.concat(results.data);
              setCards(tempCards);
            })
            .catch((err) => console.log(err));
        }
      }}
    >
      <div ref={scroll} />
      {expand ? (
        <ExpandCard
          card={expand}
          setExpand={setExpand}
        />
      ) : null }
      {filter ? (
        <FilterMenu
          setFilter={setFilter}
          setCards={setCards}
          setquery={setquery}
          setMoreCards={setMoreCards}
          scroll={scroll}
        />
      ) : null }
      <SearchBar
        setCards={setCards}
        setFilter={setFilter}
        setquery={setquery}
        setMoreCards={setMoreCards}
        scroll={scroll}
      />
      {cards.length === 0 ? (
        <div
          className="app-image"
          style={{
            backgroundImage: `url(${image})`,
          }}
        />
      ) : null}
      <DisplayCards
        cards={cards}
        setExpand={setExpand}
      />
    </div>
  );
};

export default App;
