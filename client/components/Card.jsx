/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/prop-types */
import React from 'react';
import './styles/CardStyles.css';

//  card.card_faces.image_uris.large

const Card = ({ card, setExpand }) => (
  <div className="card-container">
    <img
      className="card-image"
      id={card.name}
      src={card.image_uris ? card.image_uris.large : 'https://media.magic.wizards.com/image_legacy_migration/magic/images/mtgcom/fcpics/making/mr224_back.jpg'}
      alt="Not Found"
      onClick={() => setExpand(card)}
    />
    <div className="card-name">{card.name}</div>
  </div>
);
export default Card;
