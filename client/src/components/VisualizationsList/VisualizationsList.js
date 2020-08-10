import React from 'react';
import PropTypes from 'prop-types';
import EqualizerOutlinedIcon from '@material-ui/icons/EqualizerOutlined';
import TimelineOutlinedIcon from '@material-ui/icons/TimelineOutlined';
import TableChartOutlinedIcon from '@material-ui/icons/TableChartOutlined';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import { NavLink } from 'react-router-dom';

import './styles.css';

const chooseIcon = (type) => {
  const styles = {
    color: 'inherit',
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

const VisualizationsList = ({ visualizations, isLoading, deleteItem }) => {
  return (
    <div className="visualization-list-container">
      {!isLoading &&
        visualizations.map((visualization) => {
          return (
            <NavLink to="/visualizations" key={visualization.id} className="visualization-item">
              {chooseIcon(visualization.type)}
              <h2>{visualization.name}</h2>
              <DeleteOutlinedIcon style={{ color: 'red', fontSize: 40 }} onClick={deleteItem(visualization.id)} />
            </NavLink>
          );
        })}
    </div>
  );
};

VisualizationsList.propTypes = {
  visualizations: PropTypes.array,
  isLoading: PropTypes.bool,
  deleteItem: PropTypes.func,
};

export default VisualizationsList;
