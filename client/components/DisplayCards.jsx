/* eslint-disable react/prop-types */
import React from 'react';
import Card from './Card';
import './styles/DisplayCardsStyles.css';

const DisplayCards = ({ cards }) => (
  <div className="displayCards-container">
    {cards.map((card) => (
      <Card
        card={card}
        key={card.id}
      />
    ))}
  </div>
);

export default DisplayCards;
