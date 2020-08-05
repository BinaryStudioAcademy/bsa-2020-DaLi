import React from "react";

import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

const EnhancedTableBody = (props) => {
  const { rows, order, orderBy, stableSort, getComparator } = props;
  return (
    <TableBody>
      {stableSort(rows, getComparator(order, orderBy)).map((row, index) => {
        return (
          <TableRow>
            {Object.keys(row).map((key) => {
              return <TableCell align="center">{row[key]}</TableCell>;
            })}
          </TableRow>
        );
      })}
      <TableRow>
        <TableCell />
      </TableRow>
    </TableBody>
  );
};

export default EnhancedTableBody;
