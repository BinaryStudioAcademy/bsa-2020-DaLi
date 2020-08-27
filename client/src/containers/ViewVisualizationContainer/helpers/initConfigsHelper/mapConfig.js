const checkIsId = (key) => key.toLowerCase().search('id') !== -1;

const checkIsNumber = (value) => {
  return typeof value === 'number';
};
const checkIsDate = (value) => new Date(Number(value)).toDateString() !== 'Invalid Date';

const setColumnType = (key, value) => {
  // if value no exist, i expect number type
  if (!value.toString().length) {
    return 'number';
  }
  const isId = checkIsId(key);
  if (isId) {
    return 'id';
  }
  const isNumber = checkIsNumber(value);
  if (isNumber) {
    return 'number';
  }
  const isDate = checkIsDate(value);
  if (isDate) {
    return 'date';
  }
  return 'string';
};

const createColumnTitle = (key) => key.charAt(0).toUpperCase() + key.substr(1);

const createMapColumn = (key, index, value) => {
  const column = {
    id: key,
    title: createColumnTitle(key),
    order: index,
    type: setColumnType(key, value),
  };
  return column;
};

const createMapColumns = (dataSample) => {
  const columns = [];
  Object.keys(dataSample).forEach((key, index) => {
    const value = dataSample[key];
    const column = createMapColumn(key, index, value);
    columns.push(column);
  });
  return columns;
};

function createInitMapConfig(dataSample) {
  const columns = createMapColumns(dataSample);
  const initTableConfig = {
    columns,
    view: 'Google heat map',
  };
  return initTableConfig;
}

export default createInitMapConfig;
