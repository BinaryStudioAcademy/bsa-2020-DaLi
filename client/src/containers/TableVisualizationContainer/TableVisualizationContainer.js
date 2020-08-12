import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { EnhancedTable } from '../../components';

import { updateColumnsOrder, getRows } from './helper';

const TableVisualizationContainer = ({ config, updateConfig, data }) => {
  const { columns, sort } = config;

  const [sortOrder, setSortOrder] = useState(sort.order);
  const [sortOrderBy, setSortOrderBy] = useState(sort.orderBy);

  const handleRequestSort = (_event, property) => {
    const isAsc = sortOrderBy === property && sortOrder === 'asc';
    setSortOrder(isAsc ? 'desc' : 'asc');
    setSortOrderBy(property);
    const updatedConfig = { ...config, sort: { order: sortOrder, orderBy: sortOrderBy } };
    updateConfig(updatedConfig);
  };

  const updatedColumns = updateColumnsOrder(columns);
  const rows = getRows(data, updatedColumns, sortOrder, sortOrderBy);

  return (
    <EnhancedTable
      columns={updatedColumns}
      rows={rows}
      sortOrder={sortOrder}
      sortOrderBy={sortOrderBy}
      handleRequestSort={handleRequestSort}
    />
  );
};

TableVisualizationContainer.propTypes = {
  config: PropTypes.object,
  updateConfig: PropTypes.func,
  data: PropTypes.array,
};

export default TableVisualizationContainer;
