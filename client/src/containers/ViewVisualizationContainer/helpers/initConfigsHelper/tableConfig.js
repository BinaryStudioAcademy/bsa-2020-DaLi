function createInitTableConfig(dataSample) {
  const columns = [];
  const createColumn = (id, order) => {
    return {
      id,
      title: id.charAt(0).toUpperCase() + id.substr(1),
      order,
    };
  };

  Object.keys(dataSample).forEach((key, index) => {
    columns.push(createColumn(key, index));
  });
  return {
    columns,
    sort: {
      order: 'asc',
      orderBy: 'id',
    },
  };
}

export default createInitTableConfig;
