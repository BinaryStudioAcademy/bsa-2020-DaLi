import React from 'react';
import { connect } from 'react-redux';
import DatabaseList from '../../components/DatabaseList/DatabaseList';

const DatabasePageContainer = () => {
  return <DatabaseList />;
};

export default connect()(DatabasePageContainer);
