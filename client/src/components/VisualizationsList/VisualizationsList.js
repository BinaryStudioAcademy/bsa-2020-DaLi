import React from 'react';
import EqualizerOutlinedIcon from '@material-ui/icons/EqualizerOutlined';
import TimelineOutlinedIcon from '@material-ui/icons/TimelineOutlined';
import TableChartOutlinedIcon from '@material-ui/icons/TableChartOutlined';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import { NavLink } from 'react-router-dom';

import './styles.css';

const chooseIcon = (type) => {
  const styles = {
    color: '#000',
    fontSize: 150,
  };
  switch (type) {
    case 'LINE_CHART': {
      return <TimelineOutlinedIcon style={styles} />;
    }
    case 'BAR_CHART': {
      return <EqualizerOutlinedIcon style={styles} />;
    }
    case 'TABLE': {
      return <TableChartOutlinedIcon style={styles} />;
    }
    default: {
      return null;
    }
  }
};

const myVisualizations = [
  { id: 1, name: 'First visualization', type: 'LINE_CHART', description: '' },
  { id: 2, name: 'Second visualization', type: 'BAR_CHART', description: '' },
  { id: 3, name: 'It is the best my visualization', type: 'TABLE', description: '' },
  { id: 4, name: 'Other visualization', type: 'TABLE', description: '' },
  { id: 5, name: 'Last visualization', type: 'BAR_CHART', description: '' },
];

const VisualizationsList = () => {
  return (
    <div className="visualization-list-container">
      {myVisualizations.map((visualization) => {
        return (
          <NavLink to="/visualizations" key={visualization.id} className="visualization-item">
            {chooseIcon(visualization.type)}
            <h2>{visualization.name}</h2>
            <DeleteOutlinedIcon style={{ color: 'red', fontSize: 40 }} />
          </NavLink>
        );
      })}
    </div>
  );
};

export default VisualizationsList;
