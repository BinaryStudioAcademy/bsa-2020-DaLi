import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DatabaseList from '../../components/DatabaseList/DatabaseList';
import { deleteDatabase, getDatabases } from './actions';

const DatabasesPageContainer = ({ deleteDatabase, getDatabases }) => {
  useEffect(() => {
    getDatabases();
  }, [getDatabases]);

  return <DatabaseList deleteDatabase={deleteDatabase} />;
};

DatabasesPageContainer.propTypes = {
  deleteDatabase: PropTypes.func,
  getDatabases: PropTypes.func,
};

const mapDispatchToProps = { deleteDatabase, getDatabases };

export default connect(null, mapDispatchToProps)(DatabasesPageContainer);
