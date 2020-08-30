import React from 'react';
import Button from '@material-ui/core/Button';
import EqualizerOutlinedIcon from '@material-ui/icons/EqualizerOutlined';
import TimelineOutlinedIcon from '@material-ui/icons/TimelineOutlined';
import AppsIcon from '@material-ui/icons/Apps';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import useStyles from './styles';

const SelectVisualizationSidebar = ({ tableId }) => {
  const history = useHistory();
  const classes = useStyles();

  const myVisualizations = [
    { id: 1, name: 'Line', icon: <TimelineOutlinedIcon className={classes.iconStyles} />, type: 'line-chart' },
    { id: 2, name: 'Bar', icon: <EqualizerOutlinedIcon className={classes.iconStyles} />, type: 'bar-chart' },
    { id: 3, name: 'Table', icon: <AppsIcon className={classes.iconStyles} />, type: 'table' },
  ];

  const onButtonClick = (type) => {
    history.push({
      pathname: `/select-visualization/${type}`,
      tableId,
      prevPath: history.location.pathname,
    });
  };

  return (
    <div className={classes.basicContainer}>
      <div className={classes.lineContainer}>
        {myVisualizations.map((item, index) => {
          return (
            <Button key={index} onClick={() => onButtonClick(item.type)} className={classes.buttonStyle}>
              {item.icon}
              <span className={classes.visName}>{item.name}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
};

SelectVisualizationSidebar.propTypes = {
  tableId: PropTypes.string,
};

export default SelectVisualizationSidebar;
