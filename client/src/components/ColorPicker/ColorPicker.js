/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';
import { useStyles } from './styles';

const ColorPicker = ({ color: oldColor = 'red', label }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [color, setColor] = useState(oldColor);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleChange = (event) => {
    console.log(event);
  };

  const pickColor = (event) => {
    const newColor = event.target.style.backgroundColor;
    if (newColor) {
      setColor(newColor);
      handleClose();
    }
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div className={classes.root}>
      <div className={classes.bar}>
        <div className={classes.colorBox}>
          {/* <div className={classes.colorSquare} /> */}
          <Button
            aria-describedby={id}
            // variant="contained"
            // color="primary"
            onClick={handleClick}
            className={classes.colorSquare}
            style={{ backgroundColor: color }}
          />
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
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
                  <div className={classes.colorItem} style={{ backgroundColor: 'rgb(80, 158, 227)' }} />
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
        </div>
        <TextField
          id="standard-basic"
          label=""
          className={classes.input}
          type="text"
          InputLabelProps={{
            shrink: true,
          }}
          value={label}
          onChange={(event) => {
            handleChange(event);
          }}
        />
        <div className={classes.btnParams}>
          <KeyboardArrowDownIcon />
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;
