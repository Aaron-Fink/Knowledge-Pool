/* eslint-disable prefer-const */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import axios from 'axios';
import './styles/SearchBarStyles.css';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Checkbox from '@material-ui/core/Checkbox';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import plains from '../../public/plains.png';
import island from '../../public/island.png';
import swamp from '../../public/swamp.png';
import mountain from '../../public/mountain.png';
import forest from '../../public/forest.png';
//  function to
const SearchBar = ({
  setCards, setquery, setMoreCards, scroll,
}) => {
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [colors, setColors] = useState([]);
  const [colorsEqual, setColorsEqual] = useState('exactly');
  const [type, setType] = useState([]);
  const [typeEqual, setTypeEqual] = useState('exactly');
  const [legal, setLegal] = useState([]);
  const [cmc, setCMC] = useState('');
  const [typeCMC, setTypeCMC] = useState('=');
  const [power, setPower] = useState('');
  const [typePower, setTypePower] = useState('=');
  const [tough, setTough] = useState('');
  const [typeTough, setTypeTough] = useState('=');

  //  Upon the user submitting their query for results
  //  Pass the searched term to the parent function to display the results on the QueryResultPage
  const Search = (event) => {
    event.preventDefault();
    //  sends a get request to the server looking for all cards that match a specific term
    //  updates the list cardQuery to show the results
    axios.get('/api/filter', {
      params: {
        name,
        text,
        colors,
        colorsEqual,
        type,
        typeEqual,
        legal,
        cmc,
        typeCMC,
        power,
        typePower,
        tough,
        typeTough,
      },
    })
      .then((results) => {
        if (results.data === 'Not Found' || results.data === 'Bad Request') {
          setCards([]);
        } else {
          if (results.data.data.length === 175) {
            setMoreCards(true);
            setquery(results.data.query);
          } else {
            setMoreCards(false);
          }
          setCards(results.data.data);
          setName('');
          setText('');
          setColors([]);
          setColorsEqual('exactly');
          setType([]);
          setTypeEqual('exactly');
          setLegal([]);
          setCMC('');
          setTypeCMC('=');
          setPower('');
          setTypePower('=');
          setTough('');
          setTypeTough('=');
          scroll.current.scrollIntoView();
        }
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (e) => {
    setColorsEqual(e.target.value);
  };

  const handleTypeEqualChange = (e) => {
    setTypeEqual(e.target.value);
  };

  const handleTypeCMCChange = (e) => {
    setTypeCMC(e.target.value);
  };

  const handleTypePowerChange = (e) => {
    setTypePower(e.target.value);
  };

  const handleTypeToughChange = (e) => {
    setTypeTough(e.target.value);
  };

  const handleColorChange = (e) => {
    setColors(e.target.value);
  };

  const handleLegalChange = (e) => {
    setLegal(e.target.value);
  };

  const handleTypeChange = (e) => {
    setType(e.target.value);
  };

  //  render the search bar and the search bar button to the screen
  return (
    <div className="searchBar-container">
      <div className="search-container">
        <TextField
          // inputProps={{ style: { fontSize: '.8vw' } }}
          style={{ backgroundColor: 'white', borderRadius: '5px' }}
          variant="outlined"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="text-container">
        <TextField
          style={{ backgroundColor: 'white', borderRadius: '5px' }}
          variant="outlined"
          placeholder="Text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div className="colors-form-container">
        <FormControl
          style={{
            verticalAlign: 'unset',
            width: '53%',
            align: 'center',
            backgroundColor: 'white',
            borderRadius: '5px',
            marginRight: '2%',
          }}
        >
          <InputLabel style={{ left: '10%', bottom: '50%', color: 'black' }} shrink={false}>Colors</InputLabel>
          <Select
            variant="outlined"
            value={colors}
            renderValue={() => ''}
            multiple
            onChange={handleColorChange}
            MenuProps={{
              anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'center',
              },
              transformOrigin: {
                vertical: 'top',
                horizontal: 'center',
              },
              getContentAnchorEl: null,
            }}
          >
            <MenuItem value="w">
              <Checkbox checked={colors.indexOf('w') > -1} />
              <div style={{
                borderRadius: '25px', width: '1.5vw', height: '1.5vw', backgroundImage: `url(${plains})`, backgroundSize: 'cover',
              }}
              />
            </MenuItem>
            <MenuItem value="u">
              <Checkbox checked={colors.indexOf('u') > -1} />
              <div style={{
                borderRadius: '25px', width: '1.5vw', height: '1.5vw', backgroundImage: `url(${island})`, backgroundSize: 'cover',
              }}
              />
            </MenuItem>
            <MenuItem value="b">
              <Checkbox checked={colors.indexOf('b') > -1} />
              <div style={{
                borderRadius: '25px', width: '1.5vw', height: '1.5vw', backgroundImage: `url(${swamp})`, backgroundSize: 'cover',
              }}
              />
            </MenuItem>
            <MenuItem value="r">
              <Checkbox checked={colors.indexOf('r') > -1} />
              <div style={{
                borderRadius: '25px', width: '1.5vw', height: '1.5vw', backgroundImage: `url(${mountain})`, backgroundSize: 'cover',
              }}
              />
            </MenuItem>
            <MenuItem value="g">
              <Checkbox checked={colors.indexOf('g') > -1} />
              <div style={{
                borderRadius: '25px', width: '1.5vw', height: '1.5vw', backgroundImage: `url(${forest})`, backgroundSize: 'cover',
              }}
              />
            </MenuItem>
          </Select>
        </FormControl>
        <FormControl
          className="colors-equal-container"
          style={{
            verticalAlign: 'unset', backgroundColor: 'white', borderRadius: '5px', width: '45%',
          }}
          variant="outlined"
        >
          <Select
            value={colorsEqual}
            onChange={handleChange}
            MenuProps={{
              anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'center',
              },
              transformOrigin: {
                vertical: 'top',
                horizontal: 'center',
              },
              getContentAnchorEl: null,
            }}
          >
            <MenuItem value="exactly">Exactly</MenuItem>
            <MenuItem value="either">Either</MenuItem>
            <MenuItem value="neither">Neither</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="type-form-container">
        <FormControl
          style={{
            verticalAlign: 'unset',
            width: '53%',
            align: 'center',
            backgroundColor: 'white',
            borderRadius: '5px',
            marginRight: '2%',
          }}
        >
          <InputLabel style={{ left: '10%', bottom: '50%', color: 'black' }} shrink={false}>Type</InputLabel>
          <Select
            variant="outlined"
            value={type}
            renderValue={() => ''}
            multiple
            onChange={handleTypeChange}
            MenuProps={{
              anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'center',
              },
              transformOrigin: {
                vertical: 'top',
                horizontal: 'center',
              },
              getContentAnchorEl: null,
            }}
          >
            <MenuItem value="land">
              <Checkbox checked={type.indexOf('land') > -1} />
              <InputLabel>Land</InputLabel>
            </MenuItem>
            <MenuItem value="creature">
              <Checkbox checked={type.indexOf('creature') > -1} />
              <InputLabel>Creature</InputLabel>
            </MenuItem>
            <MenuItem value="planeswalker">
              <Checkbox checked={type.indexOf('planeswalker') > -1} />
              <InputLabel>Planeswalker</InputLabel>
            </MenuItem>
            <MenuItem value="artifact">
              <Checkbox checked={type.indexOf('artifact') > -1} />
              <InputLabel>Artifact</InputLabel>
            </MenuItem>
            <MenuItem value="enchantment">
              <Checkbox checked={type.indexOf('enchantment') > -1} />
              <InputLabel>Enchantment</InputLabel>
            </MenuItem>
            <MenuItem value="sorcery">
              <Checkbox checked={type.indexOf('sorcery') > -1} />
              <InputLabel>Sorcery</InputLabel>
            </MenuItem>
            <MenuItem value="instant">
              <Checkbox checked={type.indexOf('instant') > -1} />
              <InputLabel>Instant</InputLabel>
            </MenuItem>
            <MenuItem value="legend">
              <Checkbox checked={type.indexOf('legend') > -1} />
              <InputLabel>Legendary</InputLabel>
            </MenuItem>
          </Select>
        </FormControl>
        <FormControl
          className="colors-equal-container"
          style={{
            verticalAlign: 'unset', backgroundColor: 'white', borderRadius: '5px', width: '45%',
          }}
          variant="outlined"
        >
          <Select
            value={typeEqual}
            onChange={handleTypeEqualChange}
            MenuProps={{
              anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'center',
              },
              transformOrigin: {
                vertical: 'top',
                horizontal: 'center',
              },
              getContentAnchorEl: null,
            }}
          >
            <MenuItem value="exactly">Exactly</MenuItem>
            <MenuItem value="neither">Neither</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="cmc-container">
        <TextField
          style={{
            backgroundColor: 'white', borderRadius: '5px', width: '50%', marginRight: '2%',
          }}
          variant="outlined"
          placeholder="CMC"
          value={cmc}
          onChange={(e) => setCMC(e.target.value)}
        />
        <FormControl
          style={{
            verticalAlign: 'unset', backgroundColor: 'white', borderRadius: '5px', width: '48%',
          }}
          variant="outlined"
        >
          <Select
            value={typeCMC}
            onChange={handleTypeCMCChange}
            MenuProps={{
              anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'center',
              },
              transformOrigin: {
                vertical: 'top',
                horizontal: 'center',
              },
              getContentAnchorEl: null,
            }}
          >
            <MenuItem value="=">=</MenuItem>
            <MenuItem value="<">{'<'}</MenuItem>
            <MenuItem value=">">{'>'}</MenuItem>
            <MenuItem value="<=">{'<='}</MenuItem>
            <MenuItem value=">=">{'>='}</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="power-container">
        <TextField
          style={{
            backgroundColor: 'white', borderRadius: '5px', width: '50%', marginRight: '2%',
          }}
          variant="outlined"
          placeholder="Power"
          value={power}
          onChange={(e) => setPower(e.target.value)}
        />
        <FormControl
          style={{
            verticalAlign: 'unset', backgroundColor: 'white', borderRadius: '5px', width: '48%',
          }}
          variant="outlined"
        >
          <Select
            value={typePower}
            onChange={handleTypePowerChange}
            MenuProps={{
              anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'center',
              },
              transformOrigin: {
                vertical: 'top',
                horizontal: 'center',
              },
              getContentAnchorEl: null,
            }}
          >
            <MenuItem value="=">=</MenuItem>
            <MenuItem value="<">{'<'}</MenuItem>
            <MenuItem value=">">{'>'}</MenuItem>
            <MenuItem value="<=">{'<='}</MenuItem>
            <MenuItem value=">=">{'>='}</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="tough-container">
        <TextField
          style={{
            backgroundColor: 'white', borderRadius: '5px', width: '60%', marginRight: '2%',
          }}
          variant="outlined"
          placeholder="Toughness"
          value={tough}
          onChange={(e) => setTough(e.target.value)}
        />
        <FormControl
          style={{
            verticalAlign: 'unset', backgroundColor: 'white', borderRadius: '5px', width: '38%',
          }}
          variant="outlined"
        >
          <Select
            value={typeTough}
            onChange={handleTypeToughChange}
            MenuProps={{
              anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'center',
              },
              transformOrigin: {
                vertical: 'top',
                horizontal: 'center',
              },
              getContentAnchorEl: null,
            }}
          >
            <MenuItem value="=">=</MenuItem>
            <MenuItem value="<">{'<'}</MenuItem>
            <MenuItem value=">">{'>'}</MenuItem>
            <MenuItem value="<=">{'<='}</MenuItem>
            <MenuItem value=">=">{'>='}</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="legal-form-container">
        <FormControl
          style={{
            verticalAlign: 'unset',
            width: '4vw',
            align: 'center',
            backgroundColor: 'white',
            borderRadius: '5px',
            marginRight: '2%',
          }}
        >
          <InputLabel style={{ left: '10%', bottom: '50%', color: 'black' }} shrink={false}>Formats</InputLabel>
          <Select
            variant="outlined"
            value={legal}
            renderValue={() => ''}
            multiple
            onChange={handleLegalChange}
            MenuProps={{
              anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'center',
              },
              transformOrigin: {
                vertical: 'top',
                horizontal: 'center',
              },
              getContentAnchorEl: null,
            }}
          >
            <MenuItem value="standard">
              <Checkbox checked={legal.indexOf('standard') > -1} />
              <InputLabel>Standard</InputLabel>
            </MenuItem>
            <MenuItem value="modern">
              <Checkbox checked={legal.indexOf('modern') > -1} />
              <InputLabel>Modern</InputLabel>
            </MenuItem>
            <MenuItem value="legacy">
              <Checkbox checked={legal.indexOf('legacy') > -1} />
              <InputLabel>Legacy</InputLabel>
            </MenuItem>
            <MenuItem value="vintage">
              <Checkbox checked={legal.indexOf('vintage') > -1} />
              <InputLabel>Vintage</InputLabel>
            </MenuItem>
            <MenuItem value="commander">
              <Checkbox checked={legal.indexOf('commander') > -1} />
              <InputLabel>Commander</InputLabel>
            </MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="button-container">
        <Button
          onClick={Search}
          variant="contained"
          style={{
            height: '95%',
            verticalAlign: 'unset',
            width: '4vw',
            align: 'center',
            backgroundColor: 'white',
            borderRadius: '5px',
            marginRight: '2%',
          }}
        >
          Search
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;
