import React from 'react';
import PropTypes from 'prop-types';

import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const EnhancedTableBody = (props) => {
  const { rows } = props;
  return (
    <TableBody>
      {rows.map((row, index) => {
        return (
          <TableRow key={index}>
            {Object.keys(row).map((key, innerIndex) => {
              return <TableCell key={innerIndex}>{row[key]}</TableCell>;
            })}
          </TableRow>
        );
      })}
    </TableBody>
  );
};

EnhancedTableBody.propTypes = {
  rows: PropTypes.array,
};

export default EnhancedTableBody;
