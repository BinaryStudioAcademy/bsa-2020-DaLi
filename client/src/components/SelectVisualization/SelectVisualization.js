import React from 'react';
import EqualizerOutlinedIcon from '@material-ui/icons/EqualizerOutlined';
import TimelineOutlinedIcon from '@material-ui/icons/TimelineOutlined';
import TableChartOutlinedIcon from '@material-ui/icons/TableChartOutlined';

import { NavLink } from 'react-router-dom';

import './styles.css';

const iconStyles = {
  fontSize: 200,
};

const myVisualizations = [
  { id: 1, name: 'Line Chart', icon: <TimelineOutlinedIcon style={iconStyles} />, type: 'line-chart' },
  { id: 2, name: 'Bar Chart', icon: <EqualizerOutlinedIcon style={iconStyles} />, type: 'bar_chart' },
  { id: 3, name: 'Table', icon: <TableChartOutlinedIcon style={iconStyles} />, type: 'table' },
];

const SelectVisualization = () => {
  return (
    <div className="select-visualization-container">
      {myVisualizations.map((item) => {
        return (
          <NavLink
            to={{
              pathname: `/select-visualization/${item.type}`,
            }}
            key={item.id}
            className="visualization-container"
          >
            {item.icon}
            <h2>{item.name}</h2>
          </NavLink>
        );
      })}
    </div>
  );
};

export default SelectVisualization;
