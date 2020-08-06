import React from 'react';
import PropTypes from 'prop-types';

import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';

import EnhancedTableHead from './EnhancedTableHead';
import EnhancedTableBody from './EnhancedTableBody';

const EnhancedTable = (props) => {
  const { columns, rows, sortOrder, sortOrderBy, handleRequestSort, stableSort, getComparator } = props;

  return (
    <TableContainer>
      <Table aria-labelledby="tableTitle" size="medium" aria-label="enhanced table">
        <EnhancedTableHead
          columns={columns}
          sortOrder={sortOrder}
          sortOrderBy={sortOrderBy}
          onRequestSort={handleRequestSort}
        />
        <EnhancedTableBody
          rows={rows}
          sortOrder={sortOrder}
          sortOrderBy={sortOrderBy}
          stableSort={stableSort}
          getComparator={getComparator}
        />
      </Table>
    </TableContainer>
  );
};

EnhancedTable.propTypes = {
  columns: PropTypes.array,
  rows: PropTypes.array,
  sortOrder: PropTypes.string,
  sortOrderBy: PropTypes.string,
  handleRequestSort: PropTypes.func,
  stableSort: PropTypes.func,
  getComparator: PropTypes.func,
};

export default EnhancedTable;
