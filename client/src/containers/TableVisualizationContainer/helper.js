const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

const getComparator = (order, orderBy) => {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
};

const stableSort = (array, comparator) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
};

const sortRows = (rows, sortOrder, sortOrderBy) => stableSort(rows, getComparator(sortOrder, sortOrderBy));

export const updateColumns = (columns) => {
  return columns
    .filter((column) => column.visible)
    .sort((a, b) => {
      return a.order - b.order;
    });
};

const createColumnsOrder = (columns) => {
  const initialValue = {};
  columns.forEach((column) => {
    initialValue[column.id] = null;
  });
  return initialValue;
};

const removeRows = (data, columns) => {
  return data.map((item) => {
    const updatedItem = {};
    Object.keys(item).map((key) => {
      if (columns.find((column) => column.id === key && column.visible)) {
        updatedItem[key] = item[key];
      }
      return null;
    });
    return updatedItem;
  });
};

const updateRowsOrder = (rows, columns) => {
  return rows.map((row) => {
    const objOrder = createColumnsOrder(columns);
    return Object.assign(objOrder, row);
  });
};

export const getRows = (data, columns, sortOrder, sortOrderBy) => {
  const rows = removeRows(data, columns);
  const updatedRows = updateRowsOrder(rows, columns);
  const sortedRows = sortRows(updatedRows, sortOrder, sortOrderBy);
  return sortedRows;
};
