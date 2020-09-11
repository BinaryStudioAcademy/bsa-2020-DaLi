/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-nested-ternary */
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
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import { logout } from '../../containers/LoginPageContainer/actions';
import AddDashboardModal from '../AddDashboardModal/AddDashboardModal';
import { addDashboard } from '../../containers/AnalyticsContainer/actions';
import StyledNavLink from '../../theme/StyledNavLink';

import './styles.css';

const Header = ({ logout, addDashboard, isAdmin }) => {
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
                id="header-people"
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
                id="header-databases"
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
                id="header-permissions"
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
              <div
                role="button"
                tabIndex="0"
                className="header-logo"
                onClick={onHomePage}
                aria-hidden="true"
                id="header-homepage"
              />
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
                  id="header-browseData"
                >
                  <AppsIcon fontSize="large" />
                  <p style={{ fontSize: 20 }}>Browse Data</p>
                </NavLink>
              </StyledNavLink>
            </div>
            <div className="header-icons">
              <IconButton size="small" aria-label="dashboard" onClick={handleAddMenuClick} id="header-addMenu">
                <ControlPointIcon fontSize="large" />
              </IconButton>
              <Menu
                id="simple-menu"
                anchorEl={addMenuAnchorEl}
                keepMounted
                open={Boolean(addMenuAnchorEl)}
                onClose={handleAddMenuClose}
              >
                <MenuItem onClick={showAddDashboardModal} id="header-addMenu-addDashboard">
                  Add dashboard
                </MenuItem>
              </Menu>
              <IconButton
                size="small"
                id="header-gear"
                aria-label="settings"
                style={{ marginLeft: '20px' }}
                onClick={handleClick}
              >
                <SettingsIcon fontSize="large" />
              </IconButton>
            </div>
          </>
        )}
        <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
          <MenuItem onClick={onAccountSettings} id="header-gear-accSett">
            Account Setting
          </MenuItem>
          {isAdmin ? (
            isAdminPage ? (
              <MenuItem onClick={handleClickOnExitAdmin} id="header-gear-exitAdmin">
                Exit Admin
              </MenuItem>
            ) : (
              <MenuItem onClick={handleClickOnAdmin} id="header-gear-admin">
                Admin
              </MenuItem>
            )
          ) : null}
          <MenuItem onClick={onSignOut} id="header-gear-signOut">
            Sign out
          </MenuItem>
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
  isAdmin: PropTypes.bool,
  logout: PropTypes.func,
  addDashboard: PropTypes.func,
};

const mapStateToProps = ({ currentUser }) => ({
  isAdmin: currentUser.isAdmin,
});

const mapDispatchToProps = { logout, addDashboard };
export default connect(mapStateToProps, mapDispatchToProps)(Header);
