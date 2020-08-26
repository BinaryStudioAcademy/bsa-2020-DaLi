function includesStringSubstringFromArr(arr, string) {
  return arr.reduce((substring, hasSubstring) => {
    return string.includes(substring) || hasSubstring;
  }, false);
}

export default function normalizer(postgresType) {
  postgresType = postgresType.toLowerCase();
  const numericTypes = ['smallint', 'integer', 'bigint', 'decimal', 'numeric', 'real', 'double', 'serial', 'bugserial'];
  const dateTypes = ['date', 'timestamp', 'interval', 'time zone'];
  const stringTypes = ['character', 'varying', 'varchar', 'char', 'text'];
  const booleanTypes = ['boolean'];

  let type = 'other';
  if (includesStringSubstringFromArr(numericTypes, postgresType)) {
    type = 'number';
  } else if (includesStringSubstringFromArr(dateTypes, postgresType)) {
    type = 'date';
  } else if (includesStringSubstringFromArr(stringTypes, postgresType)) {
    type = 'string';
  } else if (includesStringSubstringFromArr(booleanTypes, postgresType)) {
    type = 'boolean';
  }
  return type;
}
