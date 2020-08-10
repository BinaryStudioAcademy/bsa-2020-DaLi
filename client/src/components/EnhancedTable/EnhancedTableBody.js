import React from 'react';
import PropTypes from 'prop-types';

import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const EnhancedTableBody = (props) => {
  const { rows } = props;
  return (
    <TableBody>
      {rows.map((row) => {
        return (
          <TableRow>
            {Object.keys(row).map((key) => {
              return <TableCell>{row[key]}</TableCell>;
            })}
          </TableRow>
        );
      })}
      <TableRow>
        <TableCell />
      </TableRow>
    </TableBody>
  );
};

EnhancedTableBody.propTypes = {
  rows: PropTypes.array,
};

export default EnhancedTableBody;
