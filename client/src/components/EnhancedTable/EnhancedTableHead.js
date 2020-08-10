import React from 'react';
import PropTypes from 'prop-types';

import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';

const EnhancedTableHead = (props) => {
  const { columns, onRequestSort, sortOrder, sortOrderBy } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {columns.map((columnHeader) => (
          <TableCell key={columnHeader.id} sortDirection={sortOrderBy === columnHeader.id ? sortOrder : false}>
            <TableSortLabel
              active={sortOrder === columnHeader.id}
              direction={sortOrderBy === columnHeader.id ? sortOrder : 'asc'}
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

EnhancedTableHead.propTypes = {
  columns: PropTypes.array,
  sortOrder: PropTypes.string,
  sortOrderBy: PropTypes.string,
  onRequestSort: PropTypes.func,
};

export default EnhancedTableHead;
