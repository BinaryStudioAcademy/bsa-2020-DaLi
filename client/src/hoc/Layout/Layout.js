import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Header } from '../../components';

const Layout = ({ isAuthorized, children }) => (
  <>
    {isAuthorized ? <Header /> : null}
    {children}
  </>
);

Layout.propTypes = {
  isAuthorized: PropTypes.bool,
  children: PropTypes.array,
};

const mapStateToProps = ({ currentUser }) => ({
  isAuthorized: currentUser.isAuthorized,
});

export default connect(mapStateToProps)(Layout);
