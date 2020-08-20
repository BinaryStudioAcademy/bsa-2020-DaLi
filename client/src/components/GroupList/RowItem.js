import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Avatar from '@material-ui/core/Avatar';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PropTypes from 'prop-types';
import { useStyles } from './styles';
import UserGroupForm from './UserGroupForm';

const RowItem = ({ item, deleteGroup, updateUserGroup, isTheGroup }) => {
  const classes = useStyles();
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [isActiveEditMode, setIsActiveEditMode] = useState(false);

  const handleMenuClick = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };
  const changeActiveEditMode = () => {
    setIsActiveEditMode(!isActiveEditMode);
  };

  const closeForm = (resetForm) => () => {
    setMenuAnchorEl(null);
    resetForm();
    changeActiveEditMode();
  };

  const saveChange = (values) => {
    const payload = {
      id: item.id,
      data: { ...values },
    };
    updateUserGroup(payload);
    setMenuAnchorEl(null);
  };

  return (
    <>
      {!isActiveEditMode && (
        <TableRow>
          <TableCell align="left" className={isTheGroup ? '' : classes.name}>
            {!isTheGroup && (
              <>
                <Avatar className={classes.avatar}>{item.name[0]}</Avatar>
                <NavLink to={`/admin/people/groups/${item.id}`}>{item.name}</NavLink>
              </>
            )}
            {isTheGroup && (
              <>
                {item.firstName} {item.lastName}
              </>
            )}
          </TableCell>
          <TableCell align="left">{isTheGroup ? item.email : item.userCount}</TableCell>
          <TableCell align="left">
            <MoreHorizIcon className={classes.dots} onClick={handleMenuClick} />
            <Menu
              id="add-menu"
              anchorEl={menuAnchorEl}
              keepMounted
              open={Boolean(menuAnchorEl)}
              onClose={() => setMenuAnchorEl(null)}
            >
              <MenuItem onClick={changeActiveEditMode}>Edit name</MenuItem>
              <MenuItem onClick={deleteGroup(item.id)}>Remove group</MenuItem>
            </Menu>
          </TableCell>
        </TableRow>
      )}
      {isActiveEditMode && (
        <UserGroupForm
          submitTitle="Edit"
          initialName={item.name}
          isTheGroup={isTheGroup}
          submit={saveChange}
          closeForm={closeForm}
        />
      )}
    </>
  );
};

RowItem.propTypes = {
  item: PropTypes.object,
  deleteGroup: PropTypes.func,
  updateUserGroup: PropTypes.func,
  isTheGroup: PropTypes.bool,
};

export default RowItem;