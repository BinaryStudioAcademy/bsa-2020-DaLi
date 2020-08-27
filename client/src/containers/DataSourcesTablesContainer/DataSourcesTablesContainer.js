import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { DataSourcesTablesView } from '../../components';
import { getTables, getDatabaseNameById } from '../DataSourcesDatasetsContainer/actions';

const DataSourcesTablesContainer = ({ tables, getTables, currentDbName, getDatabaseNameById, match }) => {
  useEffect(() => {
    getTables(match.params.id);
    getDatabaseNameById(match.params.id);
  }, []);

  return <DataSourcesTablesView tables={tables} currentDbName={currentDbName} />;
};

DataSourcesTablesContainer.propTypes = {
  tables: PropTypes.array,
  currentDbName: PropTypes.string,
  match: PropTypes.any,
  getTables: PropTypes.func,
  getDatabaseNameById: PropTypes.func,
};

const mapStateToProps = ({ datasets }) => ({
  currentDbName: datasets.currentDbName,
  tables: datasets.tables,
});

const mapDispatchToProps = { getTables, getDatabaseNameById };

export default connect(mapStateToProps, mapDispatchToProps)(DataSourcesTablesContainer);
