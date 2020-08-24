import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory, NavLink, useLocation } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import BarChartIcon from '@material-ui/icons/BarChart';
import SettingsIcon from '@material-ui/icons/Settings';
import Typography from '@material-ui/core/Typography';
import DashboardIcon from '@material-ui/icons/Dashboard';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import { logout } from '../../containers/LoginPageContainer/actions';
import AddDashboardModal from '../AddDashboardModal/AddDashboardModal';
import { addDashboard } from '../../containers/AnalyticsTabsContainer/actions';

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

  const onAccountSettings = () => {
    history.push('/account-settings');
    setAnchorEl(null);
  };

  const addVisualization = () => {
    history.push('/select-visualization');
    setAddMenuAnchorEl(null);
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
          >
            Permissions
          </NavLink>
          <SettingsIcon className={`${classes.settingBtn} header-icons`} fontSize="large" onClick={handleClick} />
        </>
      ) : (
        <>
          <div role="button" tabIndex="0" className="header-logo" onClick={onHomePage} aria-hidden="true">
            Home page
          </div>
          <div role="button" tabIndex="0" className="header-logo" onClick={onTest} aria-hidden="true">
            Home page
          </div>
          <div className="header-controls">
            <AddIcon className="header-icons" fontSize="large" onClick={handleAddMenuClick} />
            <Menu
              id="add-menu"
              anchorEl={addMenuAnchorEl}
              keepMounted
              open={Boolean(addMenuAnchorEl)}
              onClose={() => setAddMenuAnchorEl(null)}
            >
              <MenuItem onClick={addVisualization}>
                <BarChartIcon />
                Add Visualization
              </MenuItem>
              <MenuItem onClick={showAddDashboardModal}>
                <DashboardIcon />
                Add Dashboard
              </MenuItem>
            </Menu>
            <SettingsIcon className="header-icons" fontSize="large" onClick={handleClick} />
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
    </header>
  );
};

Header.propTypes = {
  logout: PropTypes.func,
  addDashboard: PropTypes.func,
};

const mapDispatchToProps = { logout, addDashboard };
export default connect(null, mapDispatchToProps)(Header);
