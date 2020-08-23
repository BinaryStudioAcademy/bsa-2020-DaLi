import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { DataSourcesTablesView } from '../../components';

const DataSourcesTablesContainer = ({ tables, currentDbName }) => {
  return <DataSourcesTablesView tables={tables} currentDbName={currentDbName} />;
};

DataSourcesTablesContainer.propTypes = {
  tables: PropTypes.array,
  currentDbName: PropTypes.string,
};

const mapStateToProps = ({ datasets }) => ({
  currentDbName: datasets.currentDbName,
  tables: datasets.tables,
});

export default connect(mapStateToProps, null)(DataSourcesTablesContainer);
