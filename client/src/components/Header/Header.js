import React from 'react';
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

import './styles.css';

const Header = ({ logout }) => {
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [addMenuAnchorEl, setAddMenuAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAddMenuClick = (event) => {
    setAddMenuAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    logout();
    setAnchorEl(null);
  };

  const addVisualization = () => {
    history.push('/select-visualization');
    setAddMenuAnchorEl(null);
  };

  return (
    <header>
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
        <MenuItem onClick={() => {}} disabled>
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
        <MenuItem onClick={handleClose} disabled>
          Account Setting
        </MenuItem>
        <MenuItem onClick={handleClose} disabled>
          Admin
        </MenuItem>
        <MenuItem onClick={handleClose}>Sign out</MenuItem>
      </Menu>
    </header>
  );
};

Header.propTypes = {
  logout: PropTypes.func,
};

const mapDispatchToProps = { logout };

export default connect(null, mapDispatchToProps)(Header);
