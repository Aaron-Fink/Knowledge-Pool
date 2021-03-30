/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import ExpandCard from './ExpandCard';
import './styles/CardStyles.css';

const Card = ({ card }) => {
  const [expand, setExpand] = useState(false);

  return (
    <div className="card-container">
      <img className="card-image" id={card.name} src={card.imageUrl ? card.imageUrl : 'https://media.magic.wizards.com/image_legacy_migration/magic/images/mtgcom/fcpics/making/mr224_back.jpg'} alt="Not Found" />
      <div className="card-name">{card.name}</div>
    </div>
  );
};

export default Card;
