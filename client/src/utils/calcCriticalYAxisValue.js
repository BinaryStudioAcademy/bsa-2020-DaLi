export function calcMinYDataValue(minValue, goal) {
  const min = goal.display ? Math.min(minValue, goal.value) : minValue;
  return min > 0 ? min * 0.7 : min * 1.2;
}

export function calcMaxYDataValue(maxVal, goal) {
  const max = goal.display ? Math.max(maxVal, goal.value) : maxVal;
  return max > 0 ? max * 1.2 : max * 0.7;
}
