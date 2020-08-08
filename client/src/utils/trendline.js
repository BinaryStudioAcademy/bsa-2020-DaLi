export function findLineByLeastSquares(valuesX, valuesY) {
  let xSum = 0;
  let ySum = 0;
  let xySum = 0;
  let xxSum = 0;
  let count = 0;

  let x = 0;
  let y = 0;
  const valuesLength = valuesX.length;

  if (valuesLength !== valuesY.length) {
    throw new Error('The parameters valuesX and valuesY need to have same size!');
  }

  //   Above and below cover edge cases
  if (valuesLength === 0) {
    return [[], []];
  }

  //   Calculate the sum for each of the parts necessary.
  for (let i = 0; i < valuesLength; i++) {
    x = valuesX[i];
    y = valuesY[i];
    xSum += x;
    ySum += y;
    xxSum += x * x;
    xySum += x * y;
    count++;
  }

  //   Calculate m and b for the line equation:
  //   y = x * m + b
  const m = (count * xySum - xSum * ySum) / (count * xxSum - xSum * xSum);
  const b = ySum / count - (m * xSum) / count;

  //   We then return the x and y data points according to our fit
  const resultValuesX = [];
  const resultValuesY = [];

  for (let i = 0; i < valuesLength; i++) {
    x = valuesX[i];
    y = x * m + b;
    resultValuesX.push(x);
    resultValuesY.push(y);
  }

  return {
    start: {
      x: resultValuesX[0],
      y: resultValuesY[0],
    },
    end: {
      x: resultValuesX[resultValuesX.length - 1],
      y: resultValuesY[resultValuesY.length - 1],
    },
  };
}
