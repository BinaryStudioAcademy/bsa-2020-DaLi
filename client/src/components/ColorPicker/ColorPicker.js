/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router-dom';
// import TextField from '@material-ui/core/TextField';
// import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
// import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
// import EqualizerOutlinedIcon from '@material-ui/icons/EqualizerOutlined';
// import TimelineOutlinedIcon from '@material-ui/icons/TimelineOutlined';
import Popover from '@material-ui/core/Popover';
// import ToggleButton from '@material-ui/lab/ToggleButton';
// import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import ButtonBase from '@material-ui/core/ButtonBase';
import { useStyles } from './styles';

const ColorPicker = ({ color: oldColor = 'red', label, index, multiline, handleColorChange, handleLabelChange }) => {
  const history = useHistory();
  const location = useLocation();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [color, setColor] = useState(oldColor);

  const theme = createMuiTheme({
    // palette: {
    //   primary: {
    //     main: '#1CD1A1',
    //   },
    //   secondary: {
    //     main: '#FAA9C6',
    //   },
    //   text: {
    //     primary: '#4E4E4E',
    //     secondary: '#858585',
    //   },
    //   background: {
    //     default: '#FAFAFA',
    //   },
    // },
  });

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const changeLabel = (label) => {
    handleLabelChange(label, index);
  };

  const pickColor = (event) => {
    const newColor = event.target.style.backgroundColor;
    if (newColor) {
      setColor(newColor);
      handleColorChange(newColor, index);
      handleClose();
    }
  };

  const handleTypeChange = (event, type) => {
    const tableId = location.pathname.match(/create-visualization\/(.*)\//)[1];
    history.push({
      pathname: `/create-visualization/${tableId}/${type}`,
      prevPath: history.location.pathname,
    });
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div className={classes.root}>
      <div className={classes.bar}>
        <div className={classes.colorBox}>
          <ButtonBase
            aria-describedby={id}
            onClick={handleClick}
            className={classes.colorSquare}
            style={{ backgroundColor: color }}
          />
          <ThemeProvider theme={theme}>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              className={classes.popper}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
            >
              <div className={classes.colorPalette} onClick={(event) => pickColor(event)}>
                <ol className={classes.colorPaletteInner}>
                  <li className={classes.colorItemWrapper}>
                    <div className={classes.colorItem} style={{ backgroundColor: '#1CD1A1' }} />
                  </li>
                  <li className={classes.colorItemWrapper}>
                    <div className={classes.colorItem} style={{ backgroundColor: 'rgb(136, 191, 77)' }} />
                  </li>
                  <li className={classes.colorItemWrapper}>
                    <div className={classes.colorItem} style={{ backgroundColor: 'rgb(169, 137, 197)' }} />
                  </li>
                  <li className={classes.colorItemWrapper}>
                    <div className={classes.colorItem} style={{ backgroundColor: 'rgb(239, 140, 140)' }} />
                  </li>
                  <li className={classes.colorItemWrapper}>
                    <div className={classes.colorItem} style={{ backgroundColor: 'rgb(249, 212, 92)' }} />
                  </li>
                  <li className={classes.colorItemWrapper}>
                    <div className={classes.colorItem} style={{ backgroundColor: 'rgb(242, 168, 111)' }} />
                  </li>
                  <li className={classes.colorItemWrapper}>
                    <div className={classes.colorItem} style={{ backgroundColor: 'rgb(152, 217, 217)' }} />
                  </li>
                  <li className={classes.colorItemWrapper}>
                    <div className={classes.colorItem} style={{ backgroundColor: 'rgb(113, 114, 173)' }} />
                  </li>
                  <li className={classes.colorItemWrapper}>
                    <div className={classes.colorItem} style={{ backgroundColor: 'rgb(116, 131, 143)' }} />
                  </li>
                </ol>
              </div>
            </Popover>
          </ThemeProvider>
        </div>
        <input
          id={`color-picker ${index}`}
          variant="outlined"
          label=""
          className={classes.input}
          type="text"
          InputLabelProps={{
            shrink: true,
          }}
          value={label}
          onChange={(event) => {
            changeLabel(event.target.value);
          }}
        />
        {/* {multiline ? (
          <div className={classes.btnParams}>
            <KeyboardArrowDownIcon />
          </div>
        ) : (
          <ToggleButtonGroup
            className={classes.btnGroup}
            value=""
            exclusive
            onChange={(event, type) => {
              handleTypeChange(event, type);
            }}
            aria-label="trendlinePolynomialOrder"
          >
            <ToggleButton
              classes={{ root: classes.btnItem, selected: classes.selected }}
              value="line-chart"
              aria-label="2"
            >
              <TimelineOutlinedIcon className={classes.iconStyles} />
            </ToggleButton>
            <ToggleButton
              classes={{ root: classes.btnItem, selected: classes.selected }}
              value="bar-chart"
              aria-label="3"
            >
              <EqualizerOutlinedIcon className={classes.iconStyles} />
            </ToggleButton>
          </ToggleButtonGroup>
        )} */}
      </div>
    </div>
  );
};

ColorPicker.propTypes = {
  color: PropTypes.string,
  label: PropTypes.string,
  index: PropTypes.number,
  multiline: PropTypes.bool,
  handleColorChange: PropTypes.func,
  handleLabelChange: PropTypes.func,
};

export default ColorPicker;
