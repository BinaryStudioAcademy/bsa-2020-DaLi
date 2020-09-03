import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory, NavLink, useLocation } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import SettingsIcon from '@material-ui/icons/Settings';
import Typography from '@material-ui/core/Typography';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AppsIcon from '@material-ui/icons/Apps';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import { logout } from '../../containers/LoginPageContainer/actions';
import AddDashboardModal from '../AddDashboardModal/AddDashboardModal';
import { addDashboard } from '../../containers/AnalyticsContainer/actions';

import './styles.css';

const useStyles = makeStyles({
  typography: {
    fontSize: '15px',
    marginRight: '25px',
  },
  link: {
    color: 'white',
    padding: '0 20px',
    minHeight: '26px',
    fontWeight: '300',
    textDecoration: 'none',
    opacity: '0.7',
  },
  settingBtn: {
    marginLeft: 'auto',
  },
  tabs: {
    minHeight: '35px',
  },
});

const Header = ({ logout, addDashboard }) => {
  const history = useHistory();
  const location = useLocation();
  const classes = useStyles();
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
      {isAdminPage ? (
        <>
          <SettingsIcon className="admin-header-icon" fontSize="large" />
          <Typography variant="h6" className={classes.typography}>
            DaLi Admin
          </Typography>
          <NavLink
            activeStyle={{
              opacity: '1',
            }}
            className={classes.link}
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
            className={classes.link}
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
            className={classes.link}
            to={{
              pathname: '/admin/permissions',
            }}
            key="permissions"
            id="header-permissions"
          >
            Permissions
          </NavLink>
          <SettingsIcon className={`${classes.settingBtn} header-icons`} fontSize="large" onClick={handleClick} />
        </>
      ) : (
        <>
          <div
            role="button"
            tabIndex="0"
            className="header-logo"
            onClick={onHomePage}
            aria-hidden="true"
            id="header-homepage"
          >
            Home page
          </div>
          <div className="header-controls">
            <div
              className="data-sources-btn"
              onClick={handleDataSourcesClick}
              onKeyDown={handleDataSourcesClick}
              aria-hidden="true"
              id="header-browseData"
            >
              <AppsIcon className="header-icons" fontSize="large" />
              Browse Data
            </div>
            <AddIcon className="header-icons" fontSize="large" onClick={handleAddMenuClick} id="header-addMenu" />
            <Menu
              id="add-menu"
              anchorEl={addMenuAnchorEl}
              keepMounted
              open={Boolean(addMenuAnchorEl)}
              onClose={() => setAddMenuAnchorEl(null)}
            >
              <MenuItem onClick={showAddDashboardModal} id="header-addMenu-addDashboard">
                <DashboardIcon />
                Add Dashboard
              </MenuItem>
            </Menu>
            <SettingsIcon className="header-icons" fontSize="large" onClick={handleClick} id="header-gear" />
          </div>
        </>
      )}
      <Menu id="header-gear-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={onAccountSettings} id="header-gear-accSett">
          Account Setting
        </MenuItem>
        {isAdminPage ? (
          <MenuItem onClick={handleClickOnExitAdmin} id="header-gear-exitAdmin">
            Exit Admin
          </MenuItem>
        ) : (
          <MenuItem onClick={handleClickOnAdmin} id="header-gear-admin">
            Admin
          </MenuItem>
        )}
        <MenuItem onClick={onSignOut} id="header-gear-signOut">
          Sign out
        </MenuItem>
      </Menu>
      <AddDashboardModal
        isVisible={addDashboardModalVisible}
        closeModal={hideAddDashboardModal}
        addDashboard={addDashboard}
      />
    </header>
  );
};

Header.propTypes = {
  logout: PropTypes.func,
  addDashboard: PropTypes.func,
};

const mapDispatchToProps = { logout, addDashboard };
export default connect(null, mapDispatchToProps)(Header);
