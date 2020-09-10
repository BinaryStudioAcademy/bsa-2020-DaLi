import React from 'react';
import PropTypes from 'prop-types';

import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';

import EnhancedTableHead from './EnhancedTableHead';
import EnhancedTableBody from './EnhancedTableBody';

import './EnhancedTable.css';

const EnhancedTable = (props) => {
  const { columns, rows, sortOrder, sortOrderBy, handleRequestSort } = props;

  const activeColumns = columns
    .filter((column) => (column.isMiniBarChart ? column.id : null))
    .map((column) => column.id);

  const maxColumnsValue = activeColumns.map((column) => {
    const maxValue = Math.max(
      ...rows.map((row) => {
        return parseFloat(row[column].toString().replace(/\s/g, ''));
      })
    );

    return { column, maxValue };
  });

  return (
    <TableContainer className="enhanced-table" id="tableVisualization">
      <Table>
        <EnhancedTableHead
          columns={columns}
          sortOrder={sortOrder}
          sortOrderBy={sortOrderBy}
          onRequestSort={handleRequestSort}
        />
        <EnhancedTableBody rows={rows} maxColumnsValue={maxColumnsValue} />
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
};

export default EnhancedTable;
