import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import { makeStyles } from '@material-ui/core/styles';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles({
  // initialTable: {
  //   height: '100%',
  //   width: '100%',
  // },
  // tableHead: {
  //   '&:hover': {
  //     cursor: 'pointer',
  //   },
  // },
});

const getTableHead = (data) => {
  return Object.keys(data[0]);
};

const sortByProperty = (arrOfObjects, property, sortedBy) => {
  if (sortedBy === property) {
    arrOfObjects.sort((a, b) => (b[property] > a[property] ? 1 : -1));
  } else {
    arrOfObjects.sort((a, b) => (a[property] > b[property] ? 1 : -1));
  }
  return arrOfObjects;
};
const InitialTable = (props) => {
  const { data: Data } = props;
  const [data, setData] = useState(Data);
  const [sortedBy, setSortedBy] = useState('id');
  const classes = useStyles();

  const tableProperties = getTableHead(data);
  const tableHeadRows = tableProperties.map((property) => (
    <TableCell
      key={property}
      className={classes.tableHead}
      onClick={() => {
        sortByProperty(data, property, sortedBy);
        setData([...data]);
        if (property === sortedBy) {
          setSortedBy('');
        } else {
          setSortedBy(property);
        }
      }}
    >
      {property}
    </TableCell>
  ));
  const tableBodyRows = data.map((obj) => {
    const rowCells = tableProperties.map((i) => <TableCell key={i}>{obj[i]}</TableCell>);
    const row = <TableRow key={JSON.stringify(obj)}>{rowCells}</TableRow>;
    return row;
  });

  return (
    <TableContainer className={classes.initialTable}>
      <Table>
        <TableHead>
          <TableRow>{tableHeadRows}</TableRow>
        </TableHead>
        <TableBody>{tableBodyRows}</TableBody>
      </Table>
    </TableContainer>
  );
};

InitialTable.propTypes = {
  data: PropTypes.array,
};

export default InitialTable;
