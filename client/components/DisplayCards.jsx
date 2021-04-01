/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React from 'react';
import Card from './Card';
import './styles/DisplayCardsStyles.css';

const DisplayCards = ({ cards, setExpand }) => (
  <div className="displayCards-container">
    {cards.map((card, idx) => (
      <Card
        card={card}
        key={card.id + idx}
        setExpand={setExpand}
      />
    ))}
  </div>
);

export default DisplayCards;
