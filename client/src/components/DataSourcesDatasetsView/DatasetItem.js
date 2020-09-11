import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Paper, Typography } from '@material-ui/core';
import { FaDatabase } from 'react-icons/fa';

import './styles.css';

const DataSourcesViewItem = ({ dataset }) => {
  const history = useHistory();

  const handleDatasetClick = (dataset) => {
    history.push(`/data-sources/${dataset.id}`);
  };

  return (
    <Paper
      variant="outlined"
      square
      className="data-source-item dataset-item"
      onClick={() => handleDatasetClick(dataset)}
    >
      <div className="paper-data-icon">
        <FaDatabase />
      </div>
      <div className="paper-data-text">
        <Typography variant="h3">{dataset.dbNickname}</Typography>
      </div>
    </Paper>
  );
};

DataSourcesViewItem.propTypes = {
  dataset: PropTypes.object,
};

export default DataSourcesViewItem;
