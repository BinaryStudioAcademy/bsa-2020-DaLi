function includesStringSubstringFromArr(arr, string) {
  let result = false;
  arr.forEach((substring) => {
    if (string.includes(substring)) {
      result = true;
    }
  });
  return result;
}

export default function normalizer(mongoType) {
  mongoType = mongoType.toLowerCase();
  const numericTypes = ['double', 'int', 'long', 'decimal'];
  const dateTypes = ['date', 'timestamp'];
  const stringTypes = ['string', 'binData', 'symbol'];
  const booleanTypes = ['bool'];

  let type = 'other';
  if (includesStringSubstringFromArr(numericTypes, mongoType)) {
    type = 'number';
  } else if (includesStringSubstringFromArr(dateTypes, mongoType)) {
    type = 'date';
  } else if (includesStringSubstringFromArr(stringTypes, mongoType)) {
    type = 'string';
  } else if (includesStringSubstringFromArr(booleanTypes, mongoType)) {
    type = 'boolean';
  }
  return type;
}
