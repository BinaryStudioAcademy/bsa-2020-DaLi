import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PeoplePageContainer from '../PeoplePageContainer/PeoplePageContainer';
import { useStyles } from './styles';

function AdminContainer(props) {
  const classes = useStyles();
  const [viewName, setViewName] = useState(props.currentViewValue);
  console.log(viewName);

  useEffect(() => {
    setViewName(props.currentViewName);
  }, [props.currentViewName]);

  return <main className={classes.root}>{viewName === 'people' && <PeoplePageContainer />}</main>;
}

const mapStateToProps = (state) => {
  return {
    currentViewName: state.adminPage.viewName,
  };
};

export default connect(mapStateToProps, null)(AdminContainer);
