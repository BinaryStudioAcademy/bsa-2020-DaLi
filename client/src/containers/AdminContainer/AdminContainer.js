import React from 'react';
import SettingsIcon from '@material-ui/icons/Settings';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

import './styles.css';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles({
  typography: {
    fontSize: '15px',
  },
  buttons: {
    textTransform: 'capitalize',
    color: 'white',
    fontWeight: 300,
  },
});

function AdminContainer() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <header className="admin-header">
        <SettingsIcon className="admin-header-icon" fontSize="large" />
        <Typography variant="h6" className={classes.typography}>
          DaLi Admin
        </Typography>
        <Tabs value={value} onChange={handleChange} className="admin-header-nav">
          <Tab className={classes.buttons} label="People" {...a11yProps(0)} />
          <Tab className={classes.buttons} label="Databases" {...a11yProps(1)} />
          <Tab className={classes.buttons} label="Permissions" {...a11yProps(2)} />
        </Tabs>
      </header>
      <main>
        <TabPanel value={value} index={0}>
          People
        </TabPanel>
        <TabPanel value={value} index={1}>
          Databases
        </TabPanel>
        <TabPanel value={value} index={2}>
          Permissions
        </TabPanel>
      </main>
    </>
  );
}

export default AdminContainer;
