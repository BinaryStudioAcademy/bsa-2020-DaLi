import React from 'react';
import Button from '@material-ui/core/Button';
import EqualizerOutlinedIcon from '@material-ui/icons/EqualizerOutlined';
import TimelineOutlinedIcon from '@material-ui/icons/TimelineOutlined';
import MapOutlinedIcon from '@material-ui/icons/MapOutlined';
import AppsIcon from '@material-ui/icons/Apps';
import { useHistory } from 'react-router-dom';
import { Tooltip } from '@material-ui/core';

import PropTypes from 'prop-types';

import useStyles from './styles';
import { canTableBeDisplayed } from '../../containers/ViewVisualizationContainer/helpers/initVisualizationHelper';

const SelectVisualizationSidebar = ({ tableId, schema }) => {
  const history = useHistory();
  const classes = useStyles();

  const chartVisualizations = ['line-chart', 'bar-chart'];

  const myVisualizations = [
    {
      id: 'selectVisualization-lineChart',
      name: 'Line',
      icon: <TimelineOutlinedIcon className={classes.iconStyles} />,
      type: 'line-chart',
    },
    {
      id: 'selectVisualization-barChart',
      name: 'Bar',
      icon: <EqualizerOutlinedIcon className={classes.iconStyles} />,
      type: 'bar-chart',
    },
    {
      id: 'selectVisualization-table',
      name: 'Table',
      icon: <AppsIcon className={classes.iconStyles} />,
      type: 'table',
    },
    {
      id: 'selectVisualization-map',
      name: 'Map',
      icon: <MapOutlinedIcon className={classes.iconStyles} />,
      type: 'map',
    },
  ];

  const onButtonClick = (type) => {
    history.push({
      pathname: `/create-visualization/${tableId}/${type}`,
      prevPath: history.location.pathname,
    });
  };

  return (
    <div className={classes.basicContainer}>
      {myVisualizations.map((item, index) => {
        const disabled = canTableBeDisplayed(schema) && chartVisualizations.includes(item.type);

        const visButton = (
          <Button
            disabled={disabled}
            key={index}
            onClick={() => onButtonClick(item.type)}
            className={classes.buttonStyle}
            id={item.id}
          >
            {item.icon}
            <span className={classes.visName}>{item.name}</span>
          </Button>
        );

        return disabled ? (
          <Tooltip
            key={index + Date.now()}
            style={{ display: 'inline' }}
            classes={{
              tooltip: classes.invalidDataTooltip,
            }}
            title={`This table has no valid data to display ${item.type}`}
          >
            <div>{visButton}</div>
          </Tooltip>
        ) : (
          visButton
        );
      })}
    </div>
  );
};

SelectVisualizationSidebar.propTypes = {
  tableId: PropTypes.string,
  schema: PropTypes.array,
};

export default SelectVisualizationSidebar;
