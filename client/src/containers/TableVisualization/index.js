import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchData } from "./actions";

import "./index.css";

const TableVisualization = (props) => {
  const { isLoading, data, error, fetchData } = props;

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      {isLoading && <div>Loading...</div>}
      {data && <div>Data is ready</div>}
      {error && <div>Error</div>}
      {console.log(data)}
    </>
  );
};

const mapStateToProps = (state) => ({
  ...state.tableVisualization,
});

const mapDispatchToProps = {
  fetchData,
};

export default connect(mapStateToProps, mapDispatchToProps)(TableVisualization);
