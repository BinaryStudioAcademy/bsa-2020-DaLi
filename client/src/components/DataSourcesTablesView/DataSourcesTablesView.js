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
import StyledNavLink from '../../theme/StyledNavLink';

import './styles.css';

const useStyles = makeStyles(() => ({
  itemList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
    marginTop: '10px',
    gridGap: '20px',
  },
}));

const DataSourcesTablesView = ({ tables, currentDbName, databaseId, syncDatabaseTables }) => {
  const classes = useStyles();

  return (
    <main className="data-source-view">
      <div className="wrapper">
        <Breadcrumbs separator={<NavigateNextIcon />} aria-label="breadcrumb">
          <StyledNavLink>
            <NavLink
              to={{
                pathname: '/data-sources',
              }}
            >
              Our data
            </NavLink>
          </StyledNavLink>
          <Typography variant="body2" color="primary">
            {currentDbName}
          </Typography>
        </Breadcrumbs>
        <div className="data-source-table-view-header">
          <Typography variant="h1" color="textPrimary">
            Tables
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<SyncIcon />}
            onClick={() => syncDatabaseTables(databaseId)}
          >
            Sync tables
          </Button>
        </div>
        <Grid container className={classes.itemList}>
          {tables.map((table) => {
            return <TableItem key={table.id} table={table} />;
          })}
        </Grid>
      </div>
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
