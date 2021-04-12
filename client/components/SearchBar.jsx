/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
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
  setCards, setquery, setMoreCards, scroll, setPage,
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
          setPage(2);
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
      <div
        className="title-container"
        onClick={() => {
          setPage(2);
          setMoreCards(false);
          setCards([]);
        }}
      >
        <div className="title">The</div>
        <div className="title">Knowledge</div>
        <div className="title">Pool</div>
      </div>
      <div className="search-container">
        <TextField
          style={{ backgroundColor: 'white', borderRadius: '5px', height: '100%' }}
          InputProps={{ style: { fontFamily: 'monospace', height: '100%' } }}
          variant="outlined"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="text-container">
        <TextField
          style={{ backgroundColor: 'white', borderRadius: '5px', height: '100%' }}
          InputProps={{ style: { fontFamily: 'monospace', height: '100%' } }}
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
            height: '100%',
          }}
          InputProps={{ style: { fontFamily: 'monospace', height: '100%' } }}
        >
          <InputLabel
            style={{
              left: '10%', bottom: '50%', color: 'black', fontFamily: 'monospace', height: '100%', marginTop: '-.4vh',
            }}
            InputProps={{ style: { fontFamily: 'monospace', height: '100%' } }}
            shrink={false}
          >
            Colors
          </InputLabel>
          <Select
            variant="outlined"
            value={colors}
            renderValue={() => ''}
            style={{ height: '100%' }}
            InputProps={{ style: { fontFamily: 'monospace', height: '100%' } }}
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
              <Checkbox checked={colors.indexOf('w') > -1} style={{ color: '#359832' }} />
              <div style={{
                borderRadius: '25px', width: '1.5vw', height: '1.5vw', backgroundImage: `url(${plains})`, backgroundSize: 'cover',
              }}
              />
            </MenuItem>
            <MenuItem value="u">
              <Checkbox checked={colors.indexOf('u') > -1} style={{ color: '#359832' }} />
              <div style={{
                borderRadius: '25px', width: '1.5vw', height: '1.5vw', backgroundImage: `url(${island})`, backgroundSize: 'cover',
              }}
              />
            </MenuItem>
            <MenuItem value="b">
              <Checkbox checked={colors.indexOf('b') > -1} style={{ color: '#359832' }} />
              <div style={{
                borderRadius: '25px', width: '1.5vw', height: '1.5vw', backgroundImage: `url(${swamp})`, backgroundSize: 'cover',
              }}
              />
            </MenuItem>
            <MenuItem value="r">
              <Checkbox checked={colors.indexOf('r') > -1} style={{ color: '#359832' }} />
              <div style={{
                borderRadius: '25px', width: '1.5vw', height: '1.5vw', backgroundImage: `url(${mountain})`, backgroundSize: 'cover',
              }}
              />
            </MenuItem>
            <MenuItem value="g">
              <Checkbox checked={colors.indexOf('g') > -1} style={{ color: '#359832' }} />
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
            verticalAlign: 'unset', backgroundColor: 'white', borderRadius: '5px', width: '45%', height: '100%', top: '-.1vh',
          }}
          InputProps={{ style: { fontFamily: 'monospace', height: '100%' } }}
          variant="outlined"
        >
          <Select
            value={colorsEqual}
            onChange={handleChange}
            style={{ fontFamily: 'monospace', height: '100%' }}
            InputProps={{ style: { fontFamily: 'monospace', height: '100%' } }}
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
            <MenuItem value="exactly" style={{ fontFamily: 'monospace' }}>Exactly</MenuItem>
            <MenuItem value="either" style={{ fontFamily: 'monospace' }}>Either</MenuItem>
            <MenuItem value="neither" style={{ fontFamily: 'monospace' }}>Neither</MenuItem>
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
            height: '100%',
          }}
        >
          <InputLabel
            style={{
              left: '10%', bottom: '50%', color: 'black', fontFamily: 'monospace', height: '100%', marginTop: '-.4vh',
            }}
            InputProps={{ style: { fontFamily: 'monospace', height: '100%' } }}
            shrink={false}
          >
            Type
          </InputLabel>
          <Select
            style={{ height: '100%' }}
            InputProps={{ style: { fontFamily: 'monospace', height: '100%' } }}
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
              <Checkbox checked={type.indexOf('land') > -1} style={{ color: '#359832' }} />
              <InputLabel style={{ fontFamily: 'monospace' }}>Land</InputLabel>
            </MenuItem>
            <MenuItem value="creature">
              <Checkbox checked={type.indexOf('creature') > -1} style={{ color: '#359832' }} />
              <InputLabel style={{ fontFamily: 'monospace' }}>Creature</InputLabel>
            </MenuItem>
            <MenuItem value="planeswalker">
              <Checkbox checked={type.indexOf('planeswalker') > -1} style={{ color: '#359832' }} />
              <InputLabel style={{ fontFamily: 'monospace' }}>Planeswalker</InputLabel>
            </MenuItem>
            <MenuItem value="artifact">
              <Checkbox checked={type.indexOf('artifact') > -1} style={{ color: '#359832' }} />
              <InputLabel style={{ fontFamily: 'monospace' }}>Artifact</InputLabel>
            </MenuItem>
            <MenuItem value="enchantment">
              <Checkbox checked={type.indexOf('enchantment') > -1} style={{ color: '#359832' }} />
              <InputLabel style={{ fontFamily: 'monospace' }}>Enchantment</InputLabel>
            </MenuItem>
            <MenuItem value="sorcery">
              <Checkbox checked={type.indexOf('sorcery') > -1} style={{ color: '#359832' }} />
              <InputLabel style={{ fontFamily: 'monospace' }}>Sorcery</InputLabel>
            </MenuItem>
            <MenuItem value="instant">
              <Checkbox checked={type.indexOf('instant') > -1} style={{ color: '#359832' }} />
              <InputLabel style={{ fontFamily: 'monospace' }}>Instant</InputLabel>
            </MenuItem>
            <MenuItem value="legend">
              <Checkbox checked={type.indexOf('legend') > -1} style={{ color: '#359832' }} />
              <InputLabel style={{ fontFamily: 'monospace' }}>Legendary</InputLabel>
            </MenuItem>
          </Select>
        </FormControl>
        <FormControl
          className="colors-equal-container"
          style={{
            verticalAlign: 'unset', backgroundColor: 'white', borderRadius: '5px', width: '45%', height: '100%', top: '-.1vh',
          }}
          variant="outlined"
        >
          <Select
            value={typeEqual}
            onChange={handleTypeEqualChange}
            style={{ fontFamily: 'monospace', height: '100%' }}
            InputProps={{ style: { fontFamily: 'monospace', height: '100%' } }}
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
            <MenuItem value="exactly" style={{ fontFamily: 'monospace' }}>Exactly</MenuItem>
            <MenuItem value="either" style={{ fontFamily: 'monospace' }}>Either</MenuItem>
            <MenuItem value="neither" style={{ fontFamily: 'monospace' }}>Neither</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="cmc-container">
        <TextField
          style={{
            backgroundColor: 'white', borderRadius: '5px', width: '50%', marginRight: '2%', height: '100%',
          }}
          InputProps={{ style: { fontFamily: 'monospace', height: '100%' } }}
          variant="outlined"
          placeholder="CMC"
          value={cmc}
          onChange={(e) => setCMC(e.target.value)}
        />
        <FormControl
          style={{
            verticalAlign: 'unset', backgroundColor: 'white', borderRadius: '5px', width: '48%', height: '100%',
          }}
          variant="outlined"
        >
          <Select
            value={typeCMC}
            style={{ height: '100%' }}
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
            backgroundColor: 'white', borderRadius: '5px', width: '50%', marginRight: '2%', height: '100%',
          }}
          InputProps={{ style: { fontFamily: 'monospace', height: '100%' } }}
          variant="outlined"
          placeholder="Power"
          value={power}
          onChange={(e) => setPower(e.target.value)}
        />
        <FormControl
          style={{
            verticalAlign: 'unset', backgroundColor: 'white', borderRadius: '5px', width: '48%', height: '100%',
          }}
          variant="outlined"
        >
          <Select
            value={typePower}
            onChange={handleTypePowerChange}
            style={{ height: '100%' }}
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
            backgroundColor: 'white', borderRadius: '5px', width: '60%', marginRight: '2%', height: '100%',
          }}
          InputProps={{ style: { fontFamily: 'monospace', height: '100%' } }}
          variant="outlined"
          placeholder="Toughness"
          value={tough}
          onChange={(e) => setTough(e.target.value)}
        />
        <FormControl
          style={{
            verticalAlign: 'unset', backgroundColor: 'white', borderRadius: '5px', width: '38%', height: '100%',
          }}
          variant="outlined"
        >
          <Select
            value={typeTough}
            onChange={handleTypeToughChange}
            style={{ height: '100%' }}
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
            height: '100%',
          }}
          InputProps={{ style: { fontFamily: 'monospace', height: '100%' } }}
        >
          <InputLabel
            style={{
              left: '10%', bottom: '50%', color: 'black', fontFamily: 'monospace', marginTop: '-.4vh',
            }}
            InputProps={{ style: { fontFamily: 'monospace', height: '100%' } }}
            shrink={false}
          >
            Formats
          </InputLabel>
          <Select
            InputProps={{ style: { fontFamily: 'monospace', height: '100%' } }}
            style={{ height: '100%' }}
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
              <Checkbox checked={legal.indexOf('standard') > -1} style={{ color: '#359832' }} />
              <InputLabel style={{ fontFamily: 'monospace' }}>Standard</InputLabel>
            </MenuItem>
            <MenuItem value="modern">
              <Checkbox checked={legal.indexOf('modern') > -1} style={{ color: '#359832' }} />
              <InputLabel style={{ fontFamily: 'monospace' }}>Modern</InputLabel>
            </MenuItem>
            <MenuItem value="legacy">
              <Checkbox checked={legal.indexOf('legacy') > -1} style={{ color: '#359832' }} />
              <InputLabel style={{ fontFamily: 'monospace' }}>Legacy</InputLabel>
            </MenuItem>
            <MenuItem value="vintage">
              <Checkbox checked={legal.indexOf('vintage') > -1} style={{ color: '#359832' }} />
              <InputLabel style={{ fontFamily: 'monospace' }}>Vintage</InputLabel>
            </MenuItem>
            <MenuItem value="commander">
              <Checkbox checked={legal.indexOf('commander') > -1} style={{ color: '#359832' }} />
              <InputLabel style={{ fontFamily: 'monospace' }}>Commander</InputLabel>
            </MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="button-container">
        <Button
          onClick={Search}
          variant="contained"
          InputProps={{ style: { fontFamily: 'monospace', height: '100%' } }}
          style={{
            height: '95%',
            verticalAlign: 'unset',
            width: '4vw',
            align: 'center',
            backgroundColor: 'white',
            borderRadius: '5px',
            marginRight: '2%',
            fontFamily: 'monospace',
          }}
        >
          Search
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;
