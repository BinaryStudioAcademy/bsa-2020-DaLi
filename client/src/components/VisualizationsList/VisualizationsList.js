import React from 'react';
import PropTypes from 'prop-types';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import { NavLink } from 'react-router-dom';

import chooseIcon from '../../helpers/chooseIcon';
import './styles.css';

const VisualizationsList = ({ visualizations, isLoading, deleteItem }) => {
  return (
    <div className="visualization-list-container">
      {!isLoading &&
        visualizations.map((visualization) => {
          return (
            <NavLink
              to={{
                pathname: `/visualizations/${visualization.id}`,
              }}
              key={visualization.id}
              className="visualization-item"
            >
              {chooseIcon(visualization.type, { color: 'inherit', fontSize: 150 })}
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
