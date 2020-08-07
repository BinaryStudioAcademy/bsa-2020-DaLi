import React, { useState } from 'react';
import { EnhancedTable } from '../../components';
import { mockData, initConfig, stableSort, getComparator } from './helpers';

const TableVisualization = () => {
  const { columns, sort } = initConfig;

  const [sortOrder, setSortOrder] = useState(sort.order);
  const [sortOrderBy, setSortOrderBy] = useState(sort.orderBy);

  const handleRequestSort = (_event, property) => {
    const isAsc = sortOrderBy === property && sortOrder === 'asc';
    setSortOrder(isAsc ? 'desc' : 'asc');
    setSortOrderBy(property);
  };

  return (
    <EnhancedTable
      columns={columns}
      rows={mockData}
      sortOrder={sortOrder}
      sortOrderBy={sortOrderBy}
      handleRequestSort={handleRequestSort}
      stableSort={stableSort}
      getComparator={getComparator}
    />
  );
};
export default TableVisualization;
