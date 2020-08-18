import React from 'react';
import { connect } from 'react-redux';
import DatabaseList from '../../components/DatabaseList/DatabaseList';

const DatabasesPageContainer = () => {
  return <DatabaseList />;
};

export default connect()(DatabasesPageContainer);
