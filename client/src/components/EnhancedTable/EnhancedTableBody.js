/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import PropTypes from 'prop-types';

import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const EnhancedTableBody = (props) => {
  const { rows, sortOrder, sortOrderBy, stableSort, getComparator } = props;
  return (
    <TableBody>
      {stableSort(rows, getComparator(sortOrder, sortOrderBy)).map((row) => {
        return (
          <TableRow>
            {Object.keys(row).map((key) => {
              return <TableCell align="center">{row[key]}</TableCell>;
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
  sortOrder: PropTypes.string,
  sortOrderBy: PropTypes.string,
  stableSort: PropTypes.func,
  getComparator: PropTypes.func,
};

export default EnhancedTableBody;
