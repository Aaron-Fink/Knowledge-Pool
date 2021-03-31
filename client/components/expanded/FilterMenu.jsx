/* eslint-disable prefer-const */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import '../styles/ExpandCardStyles.css';
import '../styles/FilterMenuStyles.css';
import Button from '@material-ui/core/Button';
import axios from 'axios';

const FilterMenu = ({
  setFilter, setCards, setquery, setMoreCards, scroll,
}) => {
  let [colors, setColors] = useState('');
  let [legalities, setLegalities] = useState([]);
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  let [rarity, setRarity] = useState([]);
  let [type, setType] = useState([]);
  let [cmc, setCMC] = useState(' ');
  let [power, setPower] = useState(' ');
  let [toughness, setToughness] = useState(' ');

  const filterSearch = () => {
    axios.get('/api/filter', {
      params: {
        colors, legalities, name, text, rarity, type, cmc, power, toughness,
      },
    })
      .then((results) => {
        if (results.data === 'Not Found') {
          setCards([]);
        } else {
          if (results.data.data.length === 175) {
            setMoreCards(true);
          } else {
            setMoreCards(false);
          }
          setquery(results.data.query);
          setCards(results.data.data);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="expandCard-container">
      <div
        className="expandCard-background"
        onClick={() => {
          setFilter(null);
        }}
      />
      <div className="expandCard-modal-container">
        <TextField
          className="filter-name-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          variant="outlined"
          label="Name"
          style={{
            margin: '2vh 2.5vw 5vh 2.5vw',
            width: '30vw',
            float: 'left',
          }}
        />
        <TextField
          className="filter-text-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          variant="outlined"
          label="Text"
          style={{
            margin: '2vh 2.5vw 5vh 2.5vw',
            width: '30vw',
            float: 'right',
          }}
        />
        <FormGroup style={{
          position: 'relative',
          width: '65vw',
          justifyContent: 'space-evenly',
          display: 'flex',
          flexDirection: 'row',
          margin: '2vh 4vh 5vh 4vh',
        }}
        >
          <FormControlLabel
            control={(
              <Checkbox
                style={{ color: 'rgb(57, 57, 255)' }}
                onClick={() => {
                  if (!colors.includes('w')) {
                    colors += 'w';
                    setColors(colors);
                  } else {
                    colors = colors.replace('w', '');
                    setColors(colors);
                  }
                }}
              />
)}
            label="W"
          />
          <FormControlLabel
            control={(
              <Checkbox
                style={{ color: 'rgb(57, 57, 255)' }}
                onClick={() => {
                  if (!colors.includes('u')) {
                    colors += 'u';
                    setColors(colors);
                  } else {
                    colors = colors.replace('u', '');
                    setColors(colors);
                  }
                }}
              />
)}
            label="U"
          />
          <FormControlLabel
            control={(
              <Checkbox
                style={{ color: 'rgb(57, 57, 255)' }}
                onClick={() => {
                  if (!colors.includes('b')) {
                    colors += 'b';
                    setColors(colors);
                  } else {
                    colors = colors.replace('b', '');
                    setColors(colors);
                  }
                }}
              />
)}
            label="B"
          />
          <FormControlLabel
            control={(
              <Checkbox
                style={{ color: 'rgb(57, 57, 255)' }}
                onClick={() => {
                  if (!colors.includes('r')) {
                    colors += 'r';
                    setColors(colors);
                  } else {
                    colors = colors.replace('r', '');
                    setColors(colors);
                  }
                }}
              />
)}
            label="R"
          />
          <FormControlLabel
            control={(
              <Checkbox
                style={{ color: 'rgb(57, 57, 255)' }}
                onClick={() => {
                  if (!colors.includes('g')) {
                    colors += 'g';
                    setColors(colors);
                  } else {
                    colors = colors.replace('g', '');
                    setColors(colors);
                  }
                }}
              />
)}
            label="G"
          />
          <FormControlLabel
            control={(
              <Checkbox
                style={{ color: 'rgb(57, 57, 255)' }}
                onClick={() => {
                  if (!colors.includes('c')) {
                    colors += 'c';
                    setColors(colors);
                  } else {
                    colors = colors.replace('c', '');
                    setColors(colors);
                  }
                }}
              />
)}
            label="C"
          />
        </FormGroup>
        <FormGroup style={{
          position: 'relative',
          width: '65vw',
          justifyContent: 'space-evenly',
          display: 'flex',
          flexDirection: 'row',
          margin: '2vh 4vh 5vh 4vh',
        }}
        >
          <FormControlLabel
            control={(
              <Checkbox
                style={{ color: 'rgb(57, 57, 255)' }}
                onClick={() => {
                  if (!rarity.includes('common')) {
                    rarity.push('common');
                    setRarity(rarity);
                  } else {
                    const indexRemove = rarity.indexOf('common');
                    rarity = rarity.splice(1, indexRemove);
                    setRarity(rarity);
                  }
                }}
              />
)}
            label="Common"
          />
          <FormControlLabel
            control={(
              <Checkbox
                style={{ color: 'rgb(57, 57, 255)' }}
                onClick={() => {
                  if (!rarity.includes('uncommon')) {
                    rarity.push('uncommon');
                    setRarity(rarity);
                  } else {
                    const indexRemove = rarity.indexOf('uncommon');
                    rarity = rarity.splice(1, indexRemove);
                    setRarity(rarity);
                  }
                }}
              />
)}
            label="Uncommon"
          />
          <FormControlLabel
            control={(
              <Checkbox
                style={{ color: 'rgb(57, 57, 255)' }}
                onClick={() => {
                  if (!rarity.includes('rare')) {
                    rarity.push('rare');
                    setRarity(rarity);
                  } else {
                    const indexRemove = rarity.indexOf('rare');
                    rarity = rarity.splice(1, indexRemove);
                    setRarity(rarity);
                  }
                }}
              />
)}
            label="Rare"
          />
          <FormControlLabel
            control={(
              <Checkbox
                style={{ color: 'rgb(57, 57, 255)' }}
                onClick={() => {
                  if (!rarity.includes('mythic')) {
                    rarity.push('mythic');
                    setRarity(rarity);
                  } else {
                    const indexRemove = rarity.indexOf('mythic');
                    rarity = rarity.splice(1, indexRemove);
                    setRarity(rarity);
                  }
                }}
              />
)}
            label="Mythic Rare"
          />
        </FormGroup>
        <FormGroup style={{
          position: 'relative',
          width: '65vw',
          justifyContent: 'space-evenly',
          display: 'flex',
          flexDirection: 'row',
          margin: '2vh 4vh 5vh 4vh',
        }}
        >
          <FormControlLabel
            control={(
              <Checkbox
                style={{ color: 'rgb(57, 57, 255)' }}
                onClick={() => {
                  if (!legalities.includes('standard')) {
                    legalities.push('standard');
                    setLegalities(legalities);
                  } else {
                    const indexRemove = type.indexOf('standard');
                    legalities = legalities.splice(1, indexRemove);
                    setLegalities(legalities);
                  }
                }}
              />
)}
            label="Standard"
          />
          <FormControlLabel
            control={(
              <Checkbox
                style={{ color: 'rgb(57, 57, 255)' }}
                onClick={() => {
                  if (!legalities.includes('modern')) {
                    legalities.push('modern');
                    setLegalities(legalities);
                  } else {
                    const indexRemove = type.indexOf('modern');
                    legalities = legalities.splice(1, indexRemove);
                    setLegalities(legalities);
                  }
                }}
              />
)}
            label="Modern"
          />
          <FormControlLabel
            control={(
              <Checkbox
                style={{ color: 'rgb(57, 57, 255)' }}
                onClick={() => {
                  if (!legalities.includes('legacy')) {
                    legalities.push('legacy');
                    setLegalities(legalities);
                  } else {
                    const indexRemove = type.indexOf('legacy');
                    legalities = legalities.splice(1, indexRemove);
                    setLegalities(legalities);
                  }
                }}
              />
)}
            label="Legacy"
          />
          <FormControlLabel
            control={(
              <Checkbox
                style={{ color: 'rgb(57, 57, 255)' }}
                onClick={() => {
                  if (!legalities.includes('vintage')) {
                    legalities.push('vintage');
                    setLegalities(legalities);
                  } else {
                    const indexRemove = type.indexOf('vintage');
                    legalities = legalities.splice(1, indexRemove);
                    setLegalities(legalities);
                  }
                }}
              />
)}
            label="Vintage"
          />
          <FormControlLabel
            control={(
              <Checkbox
                style={{ color: 'rgb(57, 57, 255)' }}
                onClick={() => {
                  if (!legalities.includes('commander')) {
                    legalities.push('commander');
                    setLegalities(legalities);
                  } else {
                    const indexRemove = type.indexOf('commander');
                    legalities = legalities.splice(1, indexRemove);
                    setLegalities(legalities);
                  }
                }}
              />
)}
            label="Commander"
          />
        </FormGroup>
        <FormGroup style={{
          position: 'relative',
          width: '65vw',
          justifyContent: 'space-evenly',
          display: 'flex',
          flexDirection: 'row',
          margin: '2vh 4vh 5vh 4vh',
        }}
        >
          <FormControlLabel
            control={(
              <Checkbox
                style={{ color: 'rgb(57, 57, 255)' }}
                onClick={() => {
                  if (!type.includes('land')) {
                    type.push('land');
                    setType(type);
                  } else {
                    const indexRemove = type.indexOf('land');
                    type = type.splice(1, indexRemove);
                    setType(type);
                  }
                }}
              />
)}
            label="Land"
          />
          <FormControlLabel
            control={(
              <Checkbox
                style={{ color: 'rgb(57, 57, 255)' }}
                onClick={() => {
                  if (!type.includes('artifact')) {
                    type.push('artifact');
                    setType(type);
                  } else {
                    const indexRemove = type.indexOf('artifact');
                    type = type.splice(1, indexRemove);
                    setType(type);
                  }
                }}
              />
)}
            label="Artifact"
          />
          <FormControlLabel
            control={(
              <Checkbox
                style={{ color: 'rgb(57, 57, 255)' }}
                onClick={() => {
                  if (!type.includes('creature')) {
                    type.push('creature');
                    setType(type);
                  } else {
                    const indexRemove = type.indexOf('creature');
                    type = type.splice(1, indexRemove);
                    setType(type);
                  }
                }}
              />
)}
            label="Creature"
          />
          <FormControlLabel
            control={(
              <Checkbox
                style={{ color: 'rgb(57, 57, 255)' }}
                onClick={() => {
                  if (!type.includes('enchantment')) {
                    type.push('enchantment');
                    setType(type);
                  } else {
                    const indexRemove = type.indexOf('enchantment');
                    type = type.splice(1, indexRemove);
                    setType(type);
                  }
                }}
              />
)}
            label="Enchantment"
          />
          <FormControlLabel
            control={(
              <Checkbox
                style={{ color: 'rgb(57, 57, 255)' }}
                onClick={() => {
                  if (!type.includes('instant')) {
                    type.push('instant');
                    setType(type);
                  } else {
                    const indexRemove = type.indexOf('instant');
                    type = type.splice(1, indexRemove);
                    setType(type);
                  }
                }}
              />
)}
            label="Instant"
          />
          <FormControlLabel
            control={(
              <Checkbox
                style={{ color: 'rgb(57, 57, 255)' }}
                onClick={() => {
                  if (!type.includes('planeswalker')) {
                    type.push('planeswalker');
                    setType(type);
                  } else {
                    const indexRemove = type.indexOf('planeswalker');
                    type = type.splice(1, indexRemove);
                    setType(type);
                  }
                }}
              />
)}
            label="Planeswalker"
          />
          <FormControlLabel
            control={(
              <Checkbox
                style={{ color: 'rgb(57, 57, 255)' }}
                onClick={() => {
                  if (!type.includes('sorcery')) {
                    type.push('sorcery');
                    setType(type);
                  } else {
                    const indexRemove = type.indexOf('sorcery');
                    type = type.splice(1, indexRemove);
                    setType(type);
                  }
                }}
              />
)}
            label="Sorcery"
          />
          <FormControlLabel
            control={(
              <Checkbox
                style={{ color: 'rgb(57, 57, 255)' }}
                onClick={() => {
                  if (!type.includes('legend')) {
                    type.push('legend');
                    setType(type);
                  } else {
                    const indexRemove = type.indexOf('legend');
                    type = type.splice(1, indexRemove);
                    setType(type);
                  }
                }}
              />
)}
            label="Legendary"
          />
        </FormGroup>
        <FormGroup style={{
          position: 'relative',
          width: '65vw',
          justifyContent: 'space-evenly',
          display: 'flex',
          flexDirection: 'row',
          margin: '2vh 4vh 5vh 4vh',
        }}
        >
          <FormControl>
            <TextField
              className="filter-name-input"
              value={cmc}
              onChange={(e) => setCMC(e.target.value)}
              variant="outlined"
              label="CMC"
              style={{
                margin: '2vh 2.5vw 1vh 2.5vw',
                width: '3vw',
                float: 'left',
              }}
            />
          </FormControl>
          <TextField
            className="filter-name-input"
            value={power}
            onChange={(e) => setPower(e.target.value)}
            variant="outlined"
            label="Power"
            style={{
              margin: '2vh 2.5vw 1vh 2.5vw',
              width: '3vw',
              float: 'left',
            }}
          />
          <TextField
            className="filter-name-input"
            value={toughness}
            onChange={(e) => setToughness(e.target.value)}
            variant="outlined"
            label="Toughness"
            style={{
              margin: '2vh 2.5vw 1vh 2.5vw',
              width: '3vw',
              float: 'left',
            }}
          />
        </FormGroup>
        <div style={{ width: '100%', margin: '1vw' }}>
          <Button
            variant="contained"
            style={{ color: 'blue' }}
            onClick={() => {
              scroll.current.scrollIntoView();
              filterSearch();
              setFilter(false);
            }}
          >
            Search with these parameters
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterMenu;
