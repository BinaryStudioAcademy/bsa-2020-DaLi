import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import { NavLink } from 'react-router-dom';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { Grid, Button } from '@material-ui/core';
import SyncIcon from '@material-ui/icons/Sync';
import TableItem from './TableItem';

import './styles.css';

const useStyles = makeStyles(() => ({
  // header: {
  //   display: 'flex',
  //   alignItems: 'center',
  //   justifyContent: 'space-between',
  //   width: '100%',
  //   boxSizing: 'border-box',
  //   paddingBottom: '20px',
  // },
  // breadcrumbsItem: {
  //   textDecoration: 'none',
  //   textTransform: 'uppercase',
  //   fontSize: '13px',
  //   lineHeight: '13px',
  //   color: 'rgba(0, 0, 0, 0.54)',
  //   'li a&:hover': {
  //     textDecoration: 'underline',
  //   },
  // },
  // separator: {
  //   fontSize: '1.75rem',
  //   marginBottom: '3px',
  // },
  // itemList: {
  //   display: 'grid',
  //   gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
  //   alignItems: 'center',
  //   gridGap: '20px',
  // },
}));

const DataSourcesTablesView = ({ tables, currentDbName, databaseId, syncDatabaseTables }) => {
  const classes = useStyles();

  return (
    <main className="data-source-view">
      <Grid className={classes.header}>
        <Breadcrumbs separator={<NavigateNextIcon className={classes.separator} />} aria-label="breadcrumb">
          <NavLink
            className={classes.breadcrumbsItem}
            color="inherit"
            to={{
              pathname: '/data-sources',
            }}
          >
            Our data
          </NavLink>
          <Typography className={classes.breadcrumbsItem}>{currentDbName}</Typography>
        </Breadcrumbs>
        <Button variant="contained" startIcon={<SyncIcon />} onClick={() => syncDatabaseTables(databaseId)}>
          sync tables
        </Button>
      </Grid>
      <Grid container className={classes.itemList}>
        {tables.map((table) => {
          return <TableItem key={table.id} table={table} />;
        })}
      </Grid>
    </main>
  );
};

DataSourcesTablesView.propTypes = {
  tables: PropTypes.array,
  currentDbName: PropTypes.string,
  syncDatabaseTables: PropTypes.func,
  databaseId: PropTypes.string,
};

export default DataSourcesTablesView;
