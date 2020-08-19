import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import AppsIcon from '@material-ui/icons/Apps';
import InfoIcon from '@material-ui/icons/Info';
import Grid from '@material-ui/core/Grid';
import { FaDatabase } from 'react-icons/fa';

import './styles.css';

const useStyles = makeStyles(() => ({
  infoIcon: {
    marginLeft: 'auto',
  },
  description: {
    color: '#808080',
  },
}));

const DataSourcesViewItem = ({ dataset, table }) => {
  const classes = useStyles();
  const history = useHistory();

  const handleDatasetClick = (dataset) => {
    history.push(`/data-sources/${dataset.id}`);
  };

  const createDatasetItem = () => {
    return (
      <Grid item className="data-source-item dataset-item" onClick={() => handleDatasetClick(dataset)}>
        <FaDatabase style={{ color: '#7073a9', fontSize: 30 }} />
        <p>{dataset.name}</p>
      </Grid>
    );
  };

  const createTableItem = () => {
    return (
      <Grid item className="data-source-item table-item" onClick={() => {}}>
        <div className="data-source-table-item-icon">
          <AppsIcon style={{ color: '#7073a9', fontSize: 30 }} />
        </div>
        <p>{table.name}</p>
        <Tooltip title={table.description} placement="left" className={classes.description}>
          <InfoIcon className={classes.infoIcon} color="action" fontSize="small" />
        </Tooltip>
      </Grid>
    );
  };

  return dataset ? createDatasetItem() : createTableItem();
};

DataSourcesViewItem.propTypes = {
  dataset: PropTypes.object,
  table: PropTypes.object,
};

export default DataSourcesViewItem;
