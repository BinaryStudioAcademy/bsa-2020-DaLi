import React, { useState } from 'react';
// import { NavLink, useHistory } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import PropTypes from 'prop-types';
import { useStyles } from './styles';
import GroupListHeader from '../GroupListHeader';
import RowItem from "./RowItem";
import UserGroupForm from "./UserGroupForm";

const GroupList = ({ groups, addUserGroup, deleteGroup, updateUserGroup }) => {

  const [isVisibleForm, setIsVisibleForm] = useState(false);
  const classes = useStyles();

  const openForm = () => {
    setIsVisibleForm(true);
  };

  const closeForm = (resetForm) => () => {
    resetForm();
    setIsVisibleForm(false);
  };

  const createUserGroup = (values) => {
    addUserGroup(values);
    closeForm();
  };

  return (
    <div className={classes.root}>
      <GroupListHeader openForm={openForm} />
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Group Name</TableCell>
              <TableCell align="left">Members</TableCell>
              <TableCell align="left">&nbsp;</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isVisibleForm && <UserGroupForm submitTitle='Add' initialName='' submit={createUserGroup} closeForm={closeForm}/> }
            {groups.map((group) => <RowItem key={group.id} group={group} deleteGroup={deleteGroup} updateUserGroup={updateUserGroup} />)}
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
};

export default GroupList;
