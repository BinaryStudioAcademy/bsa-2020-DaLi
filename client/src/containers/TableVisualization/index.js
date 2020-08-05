import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "./actions";
import { EnhancedTable } from "../../components";
import { stableSort, getComparator } from "./helpers";
import "./index.css";

const TableVisualization = (props) => {
  const { isLoading, data, config, fetchData, updateSortingConfig } = props;

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      {isLoading && <div>Loading...</div>}
      {data && (
        <EnhancedTable
          columnHeaders={config.columnHeaders}
          rows={data}
          config={config}
          updateSortingConfig={updateSortingConfig}
          stableSort={stableSort}
          getComparator={getComparator}
        />
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  ...state.tableVisualization,
});

const mapDispatchToProps = {
  ...actions,
};

export default connect(mapStateToProps, mapDispatchToProps)(TableVisualization);
