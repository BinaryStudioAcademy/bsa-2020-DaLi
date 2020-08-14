import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory, NavLink } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import BarChartIcon from '@material-ui/icons/BarChart';
import SettingsIcon from '@material-ui/icons/Settings';
import Typography from '@material-ui/core/Typography';
import DashboardIcon from '@material-ui/icons/Dashboard';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import { logout } from '../../containers/LoginPageContainer/actions';
import { changeView } from '../../containers/AdminContainer/actions';
import AddDashboardModal from '../AddDashboardModal/AddDashboardModal';

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

const Header = ({ logout, changeView }) => {
  const history = useHistory();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [addMenuAnchorEl, setAddMenuAnchorEl] = useState(null);
  const [addDashboradModalVisible, setAddDashboradModalVisible] = useState(false);

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

  const handleChangeAdminView = (viewName) => {
    changeView(viewName);
  };

  const isAdminPage = history.location.pathname.includes('/admin');

  const hideAddDashboardModal = () => {
    setAddDashboradModalVisible(false);
  };

  const showAddDashboardModal = () => {
    // history.push('/select-visualization');
    setAddMenuAnchorEl(null);
    setAddDashboradModalVisible(true);
  };

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
            onClick={() => handleChangeAdminView('people')}
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
            onClick={() => handleChangeAdminView('databases')}
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
            onClick={() => handleChangeAdminView('permissions')}
          >
            Permissions
          </NavLink>
          <SettingsIcon className={`${classes.settingBtn} header-icons`} fontSize="large" onClick={handleClick} />
        </>
      ) : (
        <>
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
        </>
      )}
      <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleClose} disabled>
          Account Setting
        </MenuItem>
        {isAdminPage ? (
          <MenuItem onClick={handleClickOnExitAdmin}>Exit Admin</MenuItem>
        ) : (
          <MenuItem onClick={handleClickOnAdmin}>Admin</MenuItem>
        )}
        <MenuItem onClick={handleClose}>Sign out</MenuItem>
      </Menu>
      <AddDashboardModal
        isVisible={addDashboradModalVisible}
        closeModal={hideAddDashboardModal}
        addDashboard={console.log}
      />
    </header>
  );
};

Header.propTypes = {
  logout: PropTypes.func,
  changeView: PropTypes.func,
};

const mapDispatchToProps = { logout, changeView };

export default connect(null, mapDispatchToProps)(Header);
