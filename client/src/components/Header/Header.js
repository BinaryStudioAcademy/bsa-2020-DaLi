import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import BarChartIcon from '@material-ui/icons/BarChart';
import SettingsIcon from '@material-ui/icons/Settings';
import DashboardIcon from '@material-ui/icons/Dashboard';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { logout } from '../../containers/LoginPageContainer/actions';
import AddDashboardModal from '../AddDashboardModal/AddDashboardModal';
import { addDashboard } from '../../containers/AnalyticsTabsContainer/actions';

import './styles.css';

const Header = ({ logout, addDashboard }) => {
  const history = useHistory();
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

  const hideAddDashboardModal = () => {
    setAddDashboradModalVisible(false);
  };

  const showAddDashboardModal = () => {
    // history.push('/select-visualization');
    setAddMenuAnchorEl(null);
    setAddDashboradModalVisible(true);
  };

  const onHomePage = () => {
    history.push('/');
    setAnchorEl(null);
  };

  return (
    <header>
      <div role="button" tabIndex="0" className="header-logo" onClick={onHomePage} aria-hidden="true">
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
        <Menu
          id="settings-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
        >
          <MenuItem onClick={onAccountSettings}>Account Setting</MenuItem>
          <MenuItem onClick={handleClose} disabled>
            Admin
          </MenuItem>
          <MenuItem onClick={onSignOut}>Sign out</MenuItem>
        </Menu>
        <AddDashboardModal
          isVisible={addDashboradModalVisible}
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
