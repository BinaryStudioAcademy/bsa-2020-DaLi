import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

function AdminContainer(props) {
  const [viewName, setViewName] = useState(props.currentViewValue);
  console.log(viewName)

  useEffect(() => {
    setViewName(props.currentViewName);
  }, [props.currentViewName]);

  return (
    <main>
      {viewName}
    </main>
  );
}

const mapStateToProps = (state) => {
  return {
    currentViewName: state.adminPage.viewName,
  };
};

export default connect(mapStateToProps, null)(AdminContainer);
