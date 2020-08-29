import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';

import Menu from '@material-ui/core/Menu';
import useStyles from './styles';

const summarizes = [
  { id: 0, name: 'Count of rows', query: '' },
  { id: 1, name: 'Sum of', query: '' },
  { id: 2, name: 'Average of', query: '' },
];

/* eslint-disable-next-line */
const SummarizeBar = ({currentVisualization}) => {
  const classes = useStyles();
  const [currentSummarize, setCurrentSummarize] = useState(null);
  const [isSummarize, setIsSummarize] = useState(false);

  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const handleMenuClick = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };
  const selectSummarize = (summarize) => () => {
    setCurrentSummarize(summarize);
    setIsSummarize(true);
    setMenuAnchorEl(null);
  };
  return (
    <div style={{ width: '100%' }}>
      <div>
        <h3>Summarize by</h3>
        {isSummarize && (
          <>
            <Button className={classes.summarizeByButton} variant="contained" fullWidth onClick={handleMenuClick}>
              {currentSummarize.name}
            </Button>
          </>
        )}
        {!isSummarize && (
          <>
            <Button className={classes.addMetricButton} fullWidth onClick={handleMenuClick}>
              Add a metric
            </Button>
          </>
        )}
        <Menu
          id="add-menu"
          anchorEl={menuAnchorEl}
          keepMounted
          open={Boolean(menuAnchorEl)}
          onClose={() => setMenuAnchorEl(null)}
        >
          {summarizes.map((summarize) => (
            <MenuItem key={summarize.id} onClick={selectSummarize(summarize)}>
              {summarize.name}
            </MenuItem>
          ))}
        </Menu>
      </div>
      {isSummarize && (
        <div>
          <h3>Group by</h3>
          <Button className={classes.summarizeByButton} variant="contained" fullWidth>
            Created At by month
          </Button>
        </div>
      )}
    </div>
  );
};

SummarizeBar.propTypes = {
  currentVisualization: PropTypes.object,
};

export default SummarizeBar;
