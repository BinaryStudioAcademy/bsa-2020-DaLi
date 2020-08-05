import React, { useState } from "react";

import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";

import EnhancedTableHead from "./EnhancedTableHead";
import EnhancedTableBody from "./EnhancedTableBody";

const EnhancedTable = (props) => {
  const {
    rows,
    columnHeaders,
    config,
    updateSortingConfig,
    stableSort,
    getComparator,
  } = props;

  const [order, setOrder] = useState(config.order);
  const [orderBy, setOrderBy] = useState(config.orderBy);

  const handleRequestSort = (_event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
    updateSortingConfig({ order, orderBy });
  };
  return (
    <TableContainer>
      <Table
        aria-labelledby="tableTitle"
        size="medium"
        aria-label="enhanced table"
      >
        <EnhancedTableHead
          order={order}
          orderBy={orderBy}
          onRequestSort={handleRequestSort}
          rowCount={rows.length}
          columnHeaders={columnHeaders}
        />
        <EnhancedTableBody
          rows={rows}
          order={order}
          orderBy={orderBy}
          stableSort={stableSort}
          getComparator={getComparator}
        />
      </Table>
    </TableContainer>
  );
};

export default EnhancedTable;
