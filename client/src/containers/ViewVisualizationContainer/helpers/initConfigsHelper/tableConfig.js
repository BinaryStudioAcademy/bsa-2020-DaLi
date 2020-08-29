const createColumnTitle = (key) => key.charAt(0).toUpperCase() + key.substr(1);

const createTableColumns = (schema) => {
  return schema.map((item, index) => {
    return {
      id: item.column_name,
      title: createColumnTitle(item.column_name),
      order: index,
      type: item.data_type,
      visible: true,
      initOrder: index,
    };
  });
};

const initTableSort = {
  order: 'asc',
  orderBy: 'id',
};

function createInitTableConfig(schema) {
  const columns = createTableColumns(schema);
  const sort = initTableSort;
  const initTableConfig = {
    columns,
    sort,
  };
  return initTableConfig;
}

export default createInitTableConfig;
