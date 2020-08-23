import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';
import Avatar from '@material-ui/core/Avatar';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ReplayIcon from '@material-ui/icons/Replay';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import { colorStyles, useStyles } from './styles';
import { formatDate } from './helpers/formatdate';
import { getSelectPlaceholder } from './helpers/selectPlaceholder';

const getInitials = (person) => {
  const name = `${person.firstName} ${person.lastName}`;
  return name
    .split(' ')
    .map((word) => word[0])
    .join('');
};

const PeopleListItem = ({
  person,
  showAddUserModal,
  showDeactivateUserModal,
  active,
  toggleUserStatus,
  showResetPasswordModal,
  membership,
  addUserToGroup,
  deleteUserFromGroup,
}) => {
  const classes = useStyles();
  const colors = colorStyles();

  const [menuAnchorEl, setMenuAnchorEl] = useState(null);

  const handleClose = () => {
    setMenuAnchorEl(null);
  };

  const handleMenuClick = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const onEditUser = () => {
    showAddUserModal(person);
    handleClose();
  };

  const onDeactivateUser = () => {
    showDeactivateUserModal(person);
    handleClose();
  };

  const onReactivateUser = () => {
    toggleUserStatus({ id: person.id, data: { isActive: person.isActive } });
    handleClose();
  };

  const handleResetPassword = () => {
    showResetPasswordModal({ id: person.id, firstName: person.firstName, lastName: person.lastName });
  };

  const addValue = (e) => {
    const getGroup = membership.filter((group) => group.name === e.target.value)[0];
    const index = getGroup.users.findIndex((user) => user.userId === person.id);

    if (index === -1) {
      addUserToGroup(person.id, getGroup.id);
    } else {
      deleteUserFromGroup(getGroup.id, getGroup.users[index].usersUserGroupsId);
    }
  };

  const renderSelectPlaceholder = () => getSelectPlaceholder(membership, person.id);

  return (
    <>
      <TableRow key={person.firstName + person.lastName}>
        <TableCell align="left">
          <div className={classes.name}>
            <Avatar className={`${classes.avatar} ${colors.admin}`}>{getInitials(person)}</Avatar>
            {`${person.firstName} ${person.lastName}`}
          </div>
        </TableCell>
        <TableCell align="left">{person.email}</TableCell>
        <TableCell align="left">
          <Select
            className={classes.select}
            onChange={addValue}
            value="All Users"
            renderValue={renderSelectPlaceholder}
            MenuProps={{
              anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'left',
              },
              transformOrigin: {
                vertical: 'top',
                horizontal: 'left',
              },
              getContentAnchorEl: null,
            }}
          >
            <MenuItem disabled value="All Users">
              All Users
            </MenuItem>
            {membership.map((group) => {
              if (group.name === 'All Users') return null;
              return (
                <MenuItem key={group.id} value={group.name}>
                  {group.name}
                  <Checkbox checked={group.users.findIndex((user) => user.userId === person.id) !== -1} />
                </MenuItem>
              );
            })}
          </Select>
        </TableCell>
        <TableCell align="left">{formatDate(person.lastLogin)}</TableCell>
        <TableCell align="left">
          {active ? (
            <>
              <MoreHorizIcon className={classes.dots} onClick={handleMenuClick} />
              {menuAnchorEl && (
                <Menu
                  id="add-menu"
                  anchorEl={menuAnchorEl}
                  keepMounted
                  open={Boolean(menuAnchorEl)}
                  onClose={() => setMenuAnchorEl(null)}
                >
                  <MenuItem onClick={onEditUser}>Edit user</MenuItem>
                  <MenuItem onClick={handleResetPassword}>Reset password</MenuItem>
                  <MenuItem onClick={onDeactivateUser}>Deactivate user</MenuItem>
                </Menu>
              )}
            </>
          ) : (
            <Tooltip title="Reactivate this account" arrow>
              <ReplayIcon onClick={onReactivateUser} style={{ cursor: 'pointer' }} />
            </Tooltip>
          )}
        </TableCell>
      </TableRow>
    </>
  );
};

PeopleListItem.propTypes = {
  showAddUserModal: PropTypes.func,
  showDeactivateUserModal: PropTypes.func,
  person: PropTypes.object,
  toggleUserStatus: PropTypes.func,
  showResetPasswordModal: PropTypes.func,
  membership: PropTypes.array,
  addUserToGroup: PropTypes.func,
  deleteUserFromGroup: PropTypes.func,
  active: PropTypes.bool,
};

export default PeopleListItem;
