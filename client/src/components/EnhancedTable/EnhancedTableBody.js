import React from 'react';
import PropTypes from 'prop-types';

import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const EnhancedTableBody = (props) => {
  const { rows, maxColumnsValue } = props;

  const calcWidthInPercent = (maxColumnsValue, columnName, cellValue) => {
    const currentColumn = maxColumnsValue.filter(({ column }) => column === columnName)[0];
    const numericCellValue = parseFloat(cellValue.toString().replace(/\s/g, ''));
    const width = (100 / currentColumn.maxValue) * numericCellValue;
    return `${width}%`;
  };

  return (
    <TableBody>
      {rows.map((row, index) => {
        return (
          <TableRow key={index}>
            {Object.keys(row).map((key, innerIndex) => {
              return (
                <TableCell key={innerIndex}>
                  <div className="cell-container">
                    {row[key]}
                    {maxColumnsValue.findIndex(({ column }) => column === key) !== -1 && (
                      <div className="mini-bar-chart">
                        <div
                          className="mini-bar-chart-progress"
                          style={{ width: `${calcWidthInPercent(maxColumnsValue, key, row[key])}` }}
                        />
                      </div>
                    )}
                  </div>
                </TableCell>
              );
            })}
          </TableRow>
        );
      })}
    </TableBody>
  );
};

EnhancedTableBody.propTypes = {
  rows: PropTypes.array,
  maxColumnsValue: PropTypes.array,
};

export default EnhancedTableBody;
