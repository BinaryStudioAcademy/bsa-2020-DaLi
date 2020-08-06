import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import SettingsIcon from '@material-ui/icons/Settings';

import './styles.css';

const Header = () => {
  const add = () => {};
  const openSettings = () => {};
  return (
    <header>
      <AddIcon className="header-icons" fontSize="large" onClick={add} />
      <SettingsIcon className="header-icons" fontSize="large" onClick={openSettings} />
    </header>
  );
};

export default Header;
