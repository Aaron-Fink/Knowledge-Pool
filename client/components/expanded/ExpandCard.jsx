/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
import React from 'react';
import '../styles/ExpandCardStyles.css';

const ExpandCard = ({ card, setExpand }) => (
  <div className="expandCard-container">
    <div className="expandCard-background" onClick={() => setExpand(null)} />
    <img
      className="expanded-card-image"
      id={card.name}
      src={card.image_uris ? card.image_uris.large : 'https://media.magic.wizards.com/image_legacy_migration/magic/images/mtgcom/fcpics/making/mr224_back.jpg'}
      alt="Not Found"
      onClick={() => setExpand(null)}
    />
  </div>
);

export default ExpandCard;
