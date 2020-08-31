import moment from 'moment';

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

const formatNumbers = (columnConfig, data) => {
  let formattedData = data;
  const { decimalPlaces, multiplyBy, separatorType } = columnConfig;

  if (multiplyBy) {
    formattedData *= multiplyBy;
  }

  if (separatorType || decimalPlaces) {
    const currentDecimalPlaces = decimalPlaces || 0;

    switch (separatorType) {
      case 1: {
        formattedData = Number(formattedData).toLocaleString('ru', {
          minimumFractionDigits: currentDecimalPlaces,
        });
        break;
      }
      case 2: {
        formattedData = Number(formattedData).toLocaleString('en', {
          minimumFractionDigits: currentDecimalPlaces,
        });
        break;
      }
      case 3: {
        formattedData = Number(formattedData).toLocaleString('de', {
          minimumFractionDigits: currentDecimalPlaces,
        });
        break;
      }
      default: {
        formattedData = Number(formattedData).toLocaleString('en', {
          useGrouping: false,
          minimumFractionDigits: currentDecimalPlaces,
        });
      }
    }
  }

  return formattedData;
};

const formatDate = (columnConfig, data) => {
  let formattedDate = moment(data).format('MMMM DD, YYYY');
  if (formattedDate === 'Invalid date') return '';

  let formatterTime = '';
  const { displayTime, timeStyle, timeType } = columnConfig;

  switch (timeType) {
    case 1: {
      formattedDate = moment(data).format('DD MMMM, YYYY');
      break;
    }
    case 2: {
      formattedDate = moment(data).format('dddd, MMMM DD, YYYY');
      break;
    }
    case 3: {
      formattedDate = moment(data).format('MM/DD/YYYY');
      break;
    }
    case 4: {
      formattedDate = moment(data).format('DD/MM/YYYY');
      break;
    }
    case 5: {
      formattedDate = moment(data).format('YYYY/MM/DD');
      break;
    }
    default: {
      break;
    }
  }

  switch (displayTime) {
    case '1': {
      formatterTime = moment(data).format('hh:mm A');
      break;
    }
    case '2': {
      formatterTime = moment(data).format('hh:mm:ss A');
      break;
    }
    case '3': {
      formatterTime = moment(data).format('hh:mm:ss:SSS A');
      break;
    }
    default: {
      break;
    }
  }

  if (displayTime && timeStyle) {
    switch (displayTime) {
      case '1': {
        formatterTime = moment(data).format('HH:mm');
        break;
      }
      case '2': {
        formatterTime = moment(data).format('HH:mm:ss');
        break;
      }
      case '3': {
        formatterTime = moment(data).format('HH:mm:ss:SSS');
        break;
      }
      default: {
        break;
      }
    }
  }

  return `${formattedDate} ${formatterTime && formatterTime}`;
};

const formatRowsData = (data, columns) => {
  return data.map((item) => {
    const updatedItem = {};
    Object.keys(item).map((key) => {
      const currentColumn = columns.find((column) => column.id === key);
      if (currentColumn.type === 'number') {
        updatedItem[key] = formatNumbers(currentColumn, item[key]);
      } else if (currentColumn.type === 'date') {
        updatedItem[key] = formatDate(currentColumn, item[key]);
      } else {
        updatedItem[key] = item[key];
      }
      return null;
    });
    return updatedItem;
  });
};

export const getRows = (data, columns, sortOrder, sortOrderBy) => {
  const rows = removeRows(data, columns);
  const formattedRows = formatRowsData(rows, columns);
  const updatedRows = updateRowsOrder(formattedRows, columns);
  const sortedRows = sortRows(updatedRows, sortOrder, sortOrderBy);
  return sortedRows;
};
