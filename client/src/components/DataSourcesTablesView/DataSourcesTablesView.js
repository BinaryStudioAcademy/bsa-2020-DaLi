import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { Grid } from '@material-ui/core';
import DataSourcesViewItem from '../DataSourcesViewItem/DataSourcesViewItem';

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
  separator: {
    fontSize: '1.75rem',
    marginBottom: '3px',
  },
  itemList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
    alignItems: 'center',
    gridGap: '20px',
  },
}));

const DataSourcesTablesView = ({ tables, getTables, currentDatasetId }) => {
  const classes = useStyles();

  useEffect(() => {
    getTables(currentDatasetId);
    // eslint-disable-next-line
  }, [getTables]);

  return (
    <main className="data-source-view">
      <Breadcrumbs
        className={classes.breadcrumbs}
        separator={<NavigateNextIcon className={classes.separator} />}
        aria-label="breadcrumb"
      >
        <Link className={classes.breadcrumbsItem} color="inherit" href="/data-sources">
          Our data
        </Link>
        <Typography className={classes.breadcrumbsItem} color="textPrimary">
          Sample dataset
        </Typography>
      </Breadcrumbs>
      <Grid container className={classes.itemList}>
        {tables.map((table) => {
          return <DataSourcesViewItem key={table.id} table={table} />;
        })}
      </Grid>
    </main>
  );
};

DataSourcesTablesView.propTypes = {
  tables: PropTypes.array,
  getTables: PropTypes.func,
  currentDatasetId: PropTypes.string,
};

export default DataSourcesTablesView;
