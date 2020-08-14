import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import SettingsIcon from '@material-ui/icons/Settings';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import { logout } from '../../containers/LoginPageContainer/actions';
import { changeView } from '../../containers/AdminContainer/actions';

import './styles.css';

const useStyles = makeStyles({
  typography: {
    fontSize: '15px',
  },
  buttons: {
    textTransform: 'capitalize',
    color: 'white',
    fontWeight: 300,
    minWidth: 'auto',
    padding: '0 20px',
  },
});

const Header = ({ logout, changeView }) => {
  const history = useHistory();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    logout();
    setAnchorEl(null);
  };

  const addVisualization = () => {
    history.push('/select-visualization');
  };

  const a11yProps = (index) => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  };

  const changeAdminPageView = (index) => {
    changeView(index);
  }

  return (
    <>
      {history.location.pathname === '/admin' ? (
        <header className="admin-header">
          <SettingsIcon className="admin-header-icon" fontSize="large" />
          <Typography variant="h6" className={classes.typography}>
            DaLi Admin
          </Typography>
          <Tabs value={value} onChange={handleChange} className="admin-header-nav">
            <Tab className={classes.buttons} label="People" onClick={() => changeAdminPageView(0)} {...a11yProps(0)} />
            <Tab className={classes.buttons} label="Databases" onClick={() => changeAdminPageView(1)} {...a11yProps(1)} />
            <Tab className={classes.buttons} label="Permissions" onClick={() => changeAdminPageView(2)} {...a11yProps(2)} />
          </Tabs>
        </header>
      ) : (
        <header>
          <AddIcon className="header-icons" fontSize="large" onClick={addVisualization} />
          <SettingsIcon className="header-icons" fontSize="large" onClick={handleClick} />
          <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
            <MenuItem onClick={handleClose} disabled>
              Account Setting
            </MenuItem>
            <MenuItem onClick={handleClose} disabled>
              Admin
            </MenuItem>
            <MenuItem onClick={handleClose}>Sign out</MenuItem>
          </Menu>
        </header>
      )}
    </>
  );
};

Header.propTypes = {
  logout: PropTypes.func,
  changeView: PropTypes.func,
};

const mapDispatchToProps = { logout, changeView };

export default connect(null, mapDispatchToProps)(Header);
