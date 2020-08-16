import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PeoplePageContainer from '../PeoplePageContainer/PeoplePageContainer';
import { useStyles } from './styles';

function AdminContainer(props) {
  const { currentViewValue, currentViewName } = props;
  const classes = useStyles();
  const [viewName, setViewName] = useState(currentViewValue);

  useEffect(() => {
    setViewName(currentViewName);
  }, [currentViewName]);

  return <main className={classes.root}>{viewName === 'people' && <PeoplePageContainer />}</main>;
}

const mapStateToProps = (state) => {
  return {
    currentViewName: state.adminPage.viewName,
  };
};

AdminContainer.propTypes = {
  currentViewName: PropTypes.string,
  currentViewValue: PropTypes.func,
};

export default connect(mapStateToProps, null)(AdminContainer);
