import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import { mockDatasets } from './mockDatasets';
import DataSourceViewItem from '../DataSourceViewItem/DataSourceViewItem';

import './styles.css';

const useStyles = makeStyles(() => ({
  breadcrumbs: {
    marginBottom: '15px',
  },
  breadcrumbsItem: {
    textTransform: 'uppercase',
    fontSize: '13px',
    lineHeight: '13px',
    color: 'rgba(0, 0, 0, 0.54)',
  },
  itemList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
    alignItems: 'center',
    gridGap: '20px',
  },
}));

const DataSourceDatasetsView = () => {
  const classes = useStyles();

  return (
    <main className="data-source-view">
      <Breadcrumbs className={classes.breadcrumbs} aria-label="breadcrumb">
        <Typography className={classes.breadcrumbsItem} color="inherit">
          Our data
        </Typography>
      </Breadcrumbs>
      <Grid container className={classes.itemList}>
        {mockDatasets.map((dataset) => {
          return <DataSourceViewItem dataset={dataset} />;
        })}
      </Grid>
    </main>
  );
};

export default DataSourceDatasetsView;
