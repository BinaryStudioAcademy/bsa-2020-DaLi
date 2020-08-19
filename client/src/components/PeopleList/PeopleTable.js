/* eslint-disable */

import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import PeopleListItem from './PeopleListItem';

const PeopleTable = ({ people, showAddUserModal, showDeactivateUserModal, active, toggleUserStatus }) => (
  <TableContainer>
    <Table aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell align="left">Name</TableCell>
          <TableCell align="left">Email</TableCell>
          <TableCell align="left">Groups</TableCell>
          <TableCell align="left">Last Login</TableCell>
          <TableCell align="left">&nbsp;</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {people.map((person) => (
          <PeopleListItem
            active={active}
            key={person.id}
            person={person}
            showAddUserModal={showAddUserModal}
            showDeactivateUserModal={showDeactivateUserModal}
            toggleUserStatus={toggleUserStatus}
          />
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default PeopleTable;
