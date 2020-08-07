import React from 'react';
import EqualizerOutlinedIcon from '@material-ui/icons/EqualizerOutlined';
import TimelineOutlinedIcon from '@material-ui/icons/TimelineOutlined';
import TableChartOutlinedIcon from '@material-ui/icons/TableChartOutlined';

import './styles.css';

const iconStyles = {
  fontSize: 200,
};

const myVisualizations = [
  { id: 1, name: 'Line Chart', icon: <TimelineOutlinedIcon style={iconStyles} />, type: 'LINE_CHART' },
  { id: 2, name: 'Bar Chart', icon: <EqualizerOutlinedIcon style={iconStyles} />, type: 'BAR_CHART' },
  { id: 3, name: 'Table', icon: <TableChartOutlinedIcon style={iconStyles} />, type: 'TABLE' },
];

const SelectVisualization = () => {
  return (
    <div className="select-visualization-container">
      {myVisualizations.map((item) => {
        return (
          <button type="button" key={item.id} className="visualization-container" onClick={() => {}}>
            {item.icon}
            <h2>{item.name}</h2>
          </button>
        );
      })}
    </div>
  );
};

export default SelectVisualization;
