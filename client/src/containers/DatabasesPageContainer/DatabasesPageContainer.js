import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DatabaseList from '../../components/DatabaseList/DatabaseList';
import { deleteDatabase, getDatabases } from './actions';

const DatabasesPageContainer = ({ deleteDatabase, getDatabases, databases, isLoading }) => {
  useEffect(() => {
    getDatabases();
  }, [getDatabases]);

  return <DatabaseList deleteDatabase={deleteDatabase} databases={databases} isLoading={isLoading} />;
};

DatabasesPageContainer.propTypes = {
  databases: PropTypes.array,
  isLoading: PropTypes.bool,
  deleteDatabase: PropTypes.func,
  getDatabases: PropTypes.func,
};
const mapStateToProps = ({ admin: { databases } }) => ({
  databases: databases.databases,
  isLoading: databases.isLoading,
  message: databases.message,
  error: databases.error,
});

const mapDispatchToProps = { deleteDatabase, getDatabases };

export default connect(mapStateToProps, mapDispatchToProps)(DatabasesPageContainer);
