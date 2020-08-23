import React from 'react';
import PropTypes from 'prop-types';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';
import Avatar from '@material-ui/core/Avatar';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ReplayIcon from '@material-ui/icons/Replay';
import { colorStyles, useStyles } from './styles';
import { formatDate } from './helpers/formatdate';

const getInitials = (person) => {
  const name = `${person.firstName} ${person.lastName}`;
  return name
    .split(' ')
    .map((word) => word[0])
    .join('');
};

const PeopleListItem = ({ person, showAddUserModal, showDeactivateUserModal, active, toggleUserStatus }) => {
  const classes = useStyles();
  const colors = colorStyles();

  const [menuAnchorEl, setMenuAnchorEl] = React.useState(null);

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

  return (
    <>
      <TableRow key={person.firstName + person.lastName}>
        <TableCell align="left" className={classes.name}>
          <Avatar className={`${classes.avatar} ${colors.admin}`}>{getInitials(person)}</Avatar>
          {`${person.firstName} ${person.lastName}`}
        </TableCell>
        <TableCell align="left">{person.email}</TableCell>
        <TableCell align="left">
              { 'TODO: Add select for groups' }
        </TableCell>
        <TableCell align="left">{formatDate(person.lastLogin)}</TableCell>
        <TableCell align="left">
          {active ? (
            <>
              <MoreHorizIcon className={classes.dots} onClick={handleMenuClick} />
              <Menu
                id="add-menu"
                anchorEl={menuAnchorEl}
                keepMounted
                open={Boolean(menuAnchorEl)}
                onClose={() => setMenuAnchorEl(null)}
              >
                <MenuItem onClick={onEditUser}>Edit user</MenuItem>
                <MenuItem onClick={() => {}} disabled>
                  Reset password
                </MenuItem>
                <MenuItem onClick={onDeactivateUser}>Deactivate user</MenuItem>
              </Menu>
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
  person: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    lastLogin: PropTypes.string,
  }),
};

export default PeopleListItem;
