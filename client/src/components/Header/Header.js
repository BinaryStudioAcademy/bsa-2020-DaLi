/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory, NavLink, useLocation } from 'react-router-dom';
import SettingsIcon from '@material-ui/icons/Settings';
import Typography from '@material-ui/core/Typography';
import AppsIcon from '@material-ui/icons/Apps';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import EventIcon from '@material-ui/icons/Event';
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import { logout } from '../../containers/LoginPageContainer/actions';
import AddDashboardModal from '../AddDashboardModal/AddDashboardModal';
import { addDashboard } from '../../containers/AnalyticsTabsContainer/actions';
import StyledNavLink from '../../theme/StyledNavLink';

import './styles.css';

const Header = ({ logout, addDashboard }) => {
  const history = useHistory();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [addMenuAnchorEl, setAddMenuAnchorEl] = useState(null);
  const [addDashboardModalVisible, setAddDashboardModalVisible] = useState(false);
  const [isAdminPage, setIsAdminPage] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAddMenuClick = (event) => {
    setAddMenuAnchorEl(event.currentTarget);
  };

  const handleAddMenuClose = () => {
    setAddMenuAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onSignOut = () => {
    logout();
    handleClose();
  };

  const handleDataSourcesClick = () => {
    history.push('/data-sources');
  };

  const onAccountSettings = () => {
    history.push('/account-settings');
    setAnchorEl(null);
  };

  const handleClickOnAdmin = () => {
    history.push('/admin/people');
    handleClose();
  };

  const handleClickOnExitAdmin = () => {
    history.push('/');
    handleClose();
  };
  const hideAddDashboardModal = () => {
    setAddDashboardModalVisible(false);
  };

  const showAddDashboardModal = () => {
    setAddMenuAnchorEl(null);
    setAddDashboardModalVisible(true);
  };

  const onHomePage = () => {
    history.push('/');
    setAnchorEl(null);
  };

  useEffect(() => {
    const status = location.pathname.includes('/admin');
    setIsAdminPage(status);
    handleClose();
  }, [location]);

  return (
    <header className={isAdminPage ? 'admin-header' : ''}>
      <div className="wrapper header-container">
        {isAdminPage ? (
          <>
            <SettingsIcon className="admin-header-icon" fontSize="large" />
            <Typography variant="h3">DaLi Admin</Typography>
            <div className="admin-header-links">
              <NavLink
                activeStyle={{
                  opacity: '1',
                }}
                className="link"
                to={{
                  pathname: '/admin/people',
                }}
                key="people"
              >
                People
              </NavLink>
              <NavLink
                activeStyle={{
                  opacity: '1',
                }}
                className="link"
                to={{
                  pathname: '/admin/databases',
                }}
                key="databases"
              >
                Databases
              </NavLink>
              <NavLink
                activeStyle={{
                  opacity: '1',
                }}
                className="link"
                to={{
                  pathname: '/admin/permissions',
                }}
                key="permissions"
              >
                Permissions
              </NavLink>
            </div>
            <IconButton
              className="admin-settings header-icons"
              size="small"
              aria-label="settings"
              style={{
                marginLeft: '20px',
                color: '#ffffff',
              }}
              onClick={handleClick}
            >
              <SettingsIcon fontSize="large" />
            </IconButton>
          </>
        ) : (
          <>
            <div className="header-logo-container">
              <div role="button" tabIndex="0" className="header-logo" onClick={onHomePage} aria-hidden="true" />
              <span className="header-logo-text">DaLi</span>
            </div>
            <div className="header-controls">
              <StyledNavLink style={{ height: 'max-content' }}>
                <NavLink
                  activeStyle={{
                    opacity: '1',
                  }}
                  to={{
                    pathname: '/data-sources',
                  }}
                  key="permissions"
                  aria-hidden="true"
                >
                  <AppsIcon fontSize="small" />
                  Browse Data
                </NavLink>
              </StyledNavLink>
            </div>
            <div className="header-icons">
              <IconButton size="small" aria-label="dashboard" onClick={handleAddMenuClick}>
                <ControlPointIcon fontSize="large" />
              </IconButton>
              <Menu
                id="simple-menu"
                anchorEl={addMenuAnchorEl}
                keepMounted
                open={Boolean(addMenuAnchorEl)}
                onClose={handleAddMenuClose}
              >
                <MenuItem onClick={showAddDashboardModal}>Add dashboard</MenuItem>
              </Menu>
              <IconButton size="small" aria-label="settings" style={{ marginLeft: '20px' }} onClick={handleClick}>
                <SettingsIcon fontSize="large" />
              </IconButton>
            </div>
          </>
        )}
        <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
          <MenuItem onClick={onAccountSettings}>Account Setting</MenuItem>
          {isAdminPage ? (
            <MenuItem onClick={handleClickOnExitAdmin}>Exit Admin</MenuItem>
          ) : (
            <MenuItem onClick={handleClickOnAdmin}>Admin</MenuItem>
          )}
          <MenuItem onClick={onSignOut}>Sign out</MenuItem>
        </Menu>
        <AddDashboardModal
          isVisible={addDashboardModalVisible}
          closeModal={hideAddDashboardModal}
          addDashboard={addDashboard}
        />
      </div>
    </header>
  );
};

Header.propTypes = {
  logout: PropTypes.func,
  addDashboard: PropTypes.func,
};

const mapDispatchToProps = { logout, addDashboard };
export default connect(null, mapDispatchToProps)(Header);
