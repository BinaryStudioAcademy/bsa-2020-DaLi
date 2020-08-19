import React, {useState} from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Avatar from "@material-ui/core/Avatar";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {useStyles} from "./styles";
import UserGroupForm from "./UserGroupForm";
import PropTypes from 'prop-types';

const RowItem = ({group, deleteGroup, updateUserGroup}) => {
  const classes = useStyles();
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [isActiveEditMode, setIsActiveEditMode] = useState(false);

  const handleMenuClick = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const changeActiveEditMode = () => {
    setIsActiveEditMode(!isActiveEditMode)
  };

  const closeForm = (resetForm) => () => {
    setMenuAnchorEl(null);
    resetForm();
    changeActiveEditMode();
  };

  const saveChange = (values) => {
    const payload = {
      id: group.id,
      data: {...values}
    };
    updateUserGroup(payload);
    setMenuAnchorEl(null);
  }

  return (
      <>
        {!isActiveEditMode && <TableRow key={group.name}>
          <TableCell align="left" className={classes.name}>
            <Avatar className={classes.avatar}>{group.name[0]}</Avatar>
            {group.name}
          </TableCell>
          <TableCell align="left">{/* {group.members} */}???</TableCell>
          <TableCell align="left">
            <MoreHorizIcon className={classes.dots} onClick={handleMenuClick}/>
            <Menu
                id="add-menu"
                anchorEl={menuAnchorEl}
                keepMounted
                open={Boolean(menuAnchorEl)}
                onClose={() => setMenuAnchorEl(null)}
            >
              <MenuItem onClick={changeActiveEditMode}>Edit name</MenuItem>
              <MenuItem onClick={deleteGroup(group.id)}>Remove group</MenuItem>
            </Menu>
          </TableCell>
        </TableRow>}
        {isActiveEditMode && <UserGroupForm submitTitle='Edit' initialName={group.name} submit={saveChange} closeForm={closeForm}/>}
      </>
  );
};

RowItem.propTypes = {
  group: PropTypes.array,
  deleteGroup: PropTypes.func,
  updateUserGroup: PropTypes.func,
}

export default RowItem;
