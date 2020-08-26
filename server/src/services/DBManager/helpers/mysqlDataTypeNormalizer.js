function includesStringSubstringFromArr(arr, string) {
  return arr.reduce((substring, hasSubstring) => {
    return string.includes(substring) || hasSubstring;
  }, false);
}

export default function normalizer(mySQLType) {
  mySQLType = mySQLType.toLowerCase();
  const numericTypes = ['int', 'integer', 'smallint', 'dec', 'fixed', 'numeric', 'float', 'real'];
  const dateTypes = ['date', 'time', 'datetime', 'timestamp', 'year'];
  const stringTypes = ['char', 'varchar', 'binary', 'varbinary', 'blob', 'text', 'enum'];
  const booleanTypes = ['bool', 'boolean', 'tinyint', 'tinyint(1)'];

  let type = 'other';
  if (includesStringSubstringFromArr(numericTypes, mySQLType)) {
    type = 'number';
  } else if (includesStringSubstringFromArr(dateTypes, mySQLType)) {
    type = 'date';
  } else if (includesStringSubstringFromArr(stringTypes, mySQLType)) {
    type = 'string';
  } else if (includesStringSubstringFromArr(booleanTypes, mySQLType)) {
    type = 'boolean';
  }
  return type;
}
