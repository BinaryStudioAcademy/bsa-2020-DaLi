import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import DatasetItem from './DatasetItem';

import './styles.css';

const useStyles = makeStyles(() => ({
  itemList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
    marginTop: '10px',
    gridGap: '20px',
  },
}));

const DataSourcesDatasetsView = ({ datasets }) => {
  const classes = useStyles();

  return (
    <main className="data-source-view">
      <div className="wrapper">
        <Breadcrumbs separator={<NavigateNextIcon />} aria-label="breadcrumb">
          <Typography variant="body2" color="primary">
            Our data
          </Typography>
        </Breadcrumbs>
        <div className="data-source-dataset-view-header">
          <Typography variant="h1" color="textPrimary">
            Datasets
          </Typography>
        </div>
        <Grid container className={classes.itemList}>
          {datasets.map((dataset) => {
            return <DatasetItem key={dataset.id} dataset={dataset} />;
          })}
        </Grid>
      </div>
    </main>
  );
};

DataSourcesDatasetsView.propTypes = {
  datasets: PropTypes.array,
};

export default DataSourcesDatasetsView;
