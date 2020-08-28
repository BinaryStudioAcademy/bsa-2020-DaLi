/* eslint-disable react/jsx-no-bind */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { DataSourcesTablesView } from '../../components';
import { getTables, getDatabaseNameById, syncDatabaseTables } from '../DataSourcesDatasetsContainer/actions';

const DataSourcesTablesContainer = ({
  tables,
  getTables,
  currentDbName,
  getDatabaseNameById,
  match,
  syncDatabaseTables,
}) => {
  useEffect(() => {
    getTables(match.params.id);
    getDatabaseNameById(match.params.id);
  }, []);

  return (
    <DataSourcesTablesView
      tables={tables}
      databaseId={match.params.id}
      syncDatabaseTables={syncDatabaseTables}
      currentDbName={currentDbName}
    />
  );
};

DataSourcesTablesContainer.propTypes = {
  tables: PropTypes.array,
  currentDbName: PropTypes.string,
  match: PropTypes.any,
  getTables: PropTypes.func,
  getDatabaseNameById: PropTypes.func,
  syncDatabaseTables: PropTypes.func,
};

const mapStateToProps = ({ datasets }) => ({
  currentDbName: datasets.currentDbName,
  tables: datasets.tables,
});

const mapDispatchToProps = { getTables, getDatabaseNameById, syncDatabaseTables };

export default connect(mapStateToProps, mapDispatchToProps)(DataSourcesTablesContainer);
