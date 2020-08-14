import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { PeopleList, GroupList } from '../../components';
import { getUsers, addUser, resetError } from './actions';
import { useStyles } from './styles';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  const classes = useStyles();

  return (
    <Typography
      component="div"
      className={classes.box}
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const PeoplePageContainer = ({ people, isLoading, getUsers, addUser, resetError }) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  useEffect(() => {
    getUsers();
    return () => {
      resetError();
    };
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs"
        className={classes.tabs}
      >
        <Tab label="People" {...a11yProps(0)} />
        <Tab label="Groups" {...a11yProps(1)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <PeopleList people={people} addUser={addUser} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        {/* <Route
          path="/groups"
          render={({ match: { path } }) => (
            <div>
              <Route exact path={path} component={GroupList} />
              <Route path={`${path}/:id`} component={GroupItem} />
            </div>
          )}
        /> */}
        <GroupList />
      </TabPanel>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    people: state.admin.people.users,
    isLoading: state.admin.people.isLoading,
  };
};

PeoplePageContainer.propTypes = {
  people: PropTypes.array,
  isLoading: PropTypes.bool,
  getUsers: PropTypes.func,
  addUser: PropTypes.func,
  resetError: PropTypes.func,
};

export default connect(mapStateToProps, { getUsers, addUser, resetError })(PeoplePageContainer);
