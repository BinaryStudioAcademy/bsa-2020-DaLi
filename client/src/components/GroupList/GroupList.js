import React, { useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import PropTypes from 'prop-types';
import { useStyles } from './styles';
import GroupListHeader from '../GroupListHeader';
import RowItem from './RowItem';
import UserGroupForm from './UserGroupForm';
import UserForm from './UserForm';

const ADMINISTRATORS = 'Administrators';
const ALL_USERS = 'All Users';

const GroupList = ({
  groups,
  addUserGroup,
  deleteGroup,
  updateUserGroup,
  currentGroup,
  isTheGroup,
  addUser,
  deleteUser,
  users = [],
  currentUserId,
}) => {
  const [isVisibleForm, setIsVisibleForm] = useState(false);

  const classes = useStyles();

  const openForm = () => {
    setIsVisibleForm(true);
  };

  const currentGroupUsers = currentGroup.Users || [];

  const usersLikeOptions = users
    .filter((user) => {
      return !currentGroupUsers.find(({ id }) => user.id === id);
    })
    .map((user) => {
      const fullName = `${user.firstName} ${user.lastName}`;
      return {
        value: user.id,
        label: fullName,
      };
    });

  const closeForm = (resetForm) => () => {
    resetForm();
    setIsVisibleForm(false);
  };

  const createUserGroup = (values) => {
    addUserGroup(values);
    closeForm();
  };

  const addUserToGroup = (values) => {
    addUser(values.user.value);
    closeForm();
  };

  return (
    <div className={classes.root}>
      <GroupListHeader
        openForm={openForm}
        title={isTheGroup ? currentGroup.name : 'Groups'}
        buttonTitle={isTheGroup ? 'Add members' : 'Create group'}
      />
      <TableContainer className={classes.tableContainer}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">{isTheGroup ? 'Members' : 'Group Name'}</TableCell>
              <TableCell align="left">{isTheGroup ? 'Email' : 'Members'}</TableCell>
              <TableCell align="left">&nbsp;</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isVisibleForm && !isTheGroup && (
              <UserGroupForm initialName="" submitTitle="Add" submit={createUserGroup} closeForm={closeForm} />
            )}
            {isVisibleForm && isTheGroup && (
              <UserForm
                usersLikeOptions={usersLikeOptions}
                submitTitle="Add"
                submit={addUserToGroup}
                closeForm={closeForm}
              />
            )}
            {!isTheGroup &&
              groups.map((group) => (
                <RowItem
                  key={group.id}
                  item={group}
                  deleteGroup={deleteGroup}
                  updateUserGroup={updateUserGroup}
                  isAllowChange={group.name !== ADMINISTRATORS && group.name !== ALL_USERS}
                />
              ))}
            {isTheGroup &&
              currentGroup.Users.map((user) => (
                <RowItem
                  users={users}
                  key={user.id}
                  isTheGroup={isTheGroup}
                  item={user}
                  deleteGroup={deleteGroup}
                  updateUserGroup={updateUserGroup}
                  deleteUser={deleteUser}
                  isAllowChange={
                    (currentGroup.name !== ADMINISTRATORS ||
                      (user.id !== currentUserId && currentGroup.Users.length > 1)) &&
                    currentGroup.name !== ALL_USERS
                  }
                />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

GroupList.propTypes = {
  groups: PropTypes.array,
  addUserGroup: PropTypes.func,
  deleteGroup: PropTypes.func,
  updateUserGroup: PropTypes.func,
  isTheGroup: PropTypes.bool,
  currentGroup: PropTypes.object,
  users: PropTypes.array,
  addUser: PropTypes.func,
  deleteUser: PropTypes.func,
  currentUserId: PropTypes.string,
};

export default GroupList;
