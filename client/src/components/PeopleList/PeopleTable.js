import React from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import PeopleListItem from './PeopleListItem';

const PeopleTable = ({
  people,
  active,
  toggleUserStatus,
  membership,
  addUserToGroup,
  deleteUserFromGroup,
  currentUserId,
  openModal,
}) => {
  return (
    <TableContainer>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={{ width: '30%' }} align="left">
              Name
            </TableCell>
            <TableCell style={{ width: '30%' }} align="left">
              Email
            </TableCell>
            <TableCell style={{ width: '20%' }} align="left">
              Groups
            </TableCell>
            <TableCell style={{ width: '10%' }} align="left">
              Last Login
            </TableCell>
            <TableCell style={{ width: '10%' }} align="left">
              &nbsp;
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {people.map((person) => (
            <PeopleListItem
              active={active}
              key={person.id}
              person={person}
              toggleUserStatus={toggleUserStatus}
              membership={membership}
              addUserToGroup={addUserToGroup}
              deleteUserFromGroup={deleteUserFromGroup}
              currentUserId={currentUserId}
              openModal={openModal}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

PeopleTable.propTypes = {
  people: PropTypes.array,
  active: PropTypes.bool,
  toggleUserStatus: PropTypes.func,
  membership: PropTypes.array,
  addUserToGroup: PropTypes.func,
  deleteUserFromGroup: PropTypes.func,
  currentUserId: PropTypes.string,
  openModal: PropTypes.func,
};
export default PeopleTable;
