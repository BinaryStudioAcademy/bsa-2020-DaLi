import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

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

function AdminContainer(props) {
  // const { currentViewValue } = props;
  const [viewValue, setViewValue] = useState(props.currentViewValue);
  // console.log(viewValue)

  useEffect(() => {
    console.log(props.currentViewValue)
    setViewValue(props.currentViewValue);
  }, [props.currentViewValue]);

  return (
    <main>
      <TabPanel value={viewValue} index={0}>
        People
      </TabPanel>
      <TabPanel value={viewValue} index={1}>
        Databases
      </TabPanel>
      <TabPanel value={viewValue} index={2}>
        Permissions
      </TabPanel>
    </main>
  );
}

// AdminContainer.defaultProps = {
//   viewValue: 1,
// };

const mapStateToProps = (state) => {
  return {
    currentViewValue: state.adminPage.viewValue,
  };
};

export default connect(mapStateToProps, null)(AdminContainer);
