import React, { useState } from 'react';
import { Avatar, Grid, Typography, Tab, Tabs, Box } from '@material-ui/core';

import { mockProfile, getUserInitials } from './helper';

import useStyles from './styles';

const AccountSettingsContainer = () => {
  const [activeTab, setActiveTab] = useState(0);
  const classes = useStyles();
  const userInitials = getUserInitials(mockProfile);

  const handleTabChange = (_event, tabIndex) => {
    setActiveTab(tabIndex);
  };

  return (
    <Grid className={classes.accountSettingsContainer} container direction="column">
      <Grid className={classes.accountSettingsHeader} item container direction="column" alignItems="center">
        <Avatar className={classes.accountSettingsAvatar}>{userInitials}</Avatar>
        <Typography className={classes.accountSettingsTitle}> Account settings </Typography>
        <Tabs
          classes={{
            root: classes.accountSettingsTabs,
            indicator: classes.accountSettingsTabsIndicator,
          }}
          value={activeTab}
          onChange={handleTabChange}
        >
          <Tab
            classes={{
              root: classes.accountSettingsTab,
              selected: classes.accountSettingsTabSelected,
            }}
            label="Profile"
          />
          <Tab
            classes={{
              root: classes.accountSettingsTab,
              selected: classes.accountSettingsTabSelected,
            }}
            label="Password"
          />
        </Tabs>
      </Grid>
      <Grid className={classes.accountSettingsContent} xs item container direction="column" alignItems="center">
        <Box className={classes.accountSettingsTabPanel} hidden={activeTab !== 0}>
          <Typography> Profile </Typography>
        </Box>
        <Box className={classes.accountSettingsTabPanel} hidden={activeTab !== 1}>
          <Typography> Password </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default AccountSettingsContainer;
