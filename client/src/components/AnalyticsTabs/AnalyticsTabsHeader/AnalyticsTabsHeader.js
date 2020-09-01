import React from 'react';
import PropTypes from 'prop-types';
// import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';

// const useStyles = makeStyles(() => ({
//   tabsHeader: {
//     boxShadow: 'none',
//     backgroundColor: 'inherit',
//     color: '#509ee3',
//     fontWeight: 900,
//     paddingBottom: 0,
//   },
//   tabsContainer: {
//     width: '100%',
//   },
//   selected: {},
//   indicator: {
//     backgroundColor: '#509ee3',
//   },
// }));

// const useStyles = makeStyles((theme) => ({
//   root: {
//     color: theme.palette.primary.main
//   },
//   checked: {},
// }));

const TabsHeader = ({ value, children, onChange }) => {
  // const classes = useStyles();
  return (
    <AppBar position="static" color="primary">
      <Tabs value={value} onChange={onChange}>
        {children}
      </Tabs>
    </AppBar>
  );
};

TabsHeader.propTypes = {
  value: PropTypes.number,
  children: PropTypes.node,
  onChange: PropTypes.func,
};

export default TabsHeader;
