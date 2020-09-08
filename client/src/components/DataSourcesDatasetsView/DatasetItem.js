import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { FaDatabase } from 'react-icons/fa';

import './styles.css';

const DataSourcesViewItem = ({ dataset }) => {
  const history = useHistory();

  const handleDatasetClick = (dataset) => {
    history.push(`/data-sources/${dataset.id}`);
  };

  return (
    <Grid
      item
      className="data-source-item dataset-item"
      onClick={() => handleDatasetClick(dataset)}
      id={`dataset-${dataset.dbNickname}`}
    >
      <FaDatabase style={{ color: '#7073a9', fontSize: 30 }} />
      <p>{dataset.dbNickname}</p>
    </Grid>
  );
};

DataSourcesViewItem.propTypes = {
  dataset: PropTypes.object,
};

export default DataSourcesViewItem;
