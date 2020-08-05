import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";

const EnhancedTableHead = (props) => {
  const { columnHeaders, onRequestSort, order, orderBy } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {columnHeaders.map((columnHeader) => (
          <TableCell
            key={columnHeader.id}
            align="center"
            sortDirection={orderBy === columnHeader.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === columnHeader.id}
              direction={orderBy === columnHeader.id ? order : "asc"}
              onClick={createSortHandler(columnHeader.id)}
            >
              {columnHeader.title}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default EnhancedTableHead;
