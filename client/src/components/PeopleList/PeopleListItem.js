import React from 'react';
import PropTypes from 'prop-types';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import FormControl from '@material-ui/core/FormControl';
import Avatar from '@material-ui/core/Avatar';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { colorStyles, useStyles } from './styles';
import { formatDate } from './helpers/formatdate';
// import Select from '@material-ui/core/Select';
// import Checkbox from '@material-ui/core/Checkbox';
// import Input from '@material-ui/core/Input';
// import InputLabel from '@material-ui/core/InputLabel';
// import ListItemText from '@material-ui/core/ListItemText';

// const [groups, setGroups] = React.useState(['Admin', 'Default']);

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       width: 250,
//     },
//   },
// };

// const handleChange = (event) => {
//   // setGroups(event.target.value);
// };

const getInitials = (person) => {
  const name = `${person.firstName} ${person.lastName}`;
  return name
    .split(' ')
    .map((word) => word[0])
    .join('');
};

const PeopleListItem = ({ person, showAddUserModal }) => {
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

  return (
    <>
      <TableRow key={person.firstName + person.lastName}>
        <TableCell align="left" className={classes.name}>
          <Avatar className={`${classes.avatar} ${colors.admin}`}>{getInitials(person)}</Avatar>
          {`${person.firstName} ${person.lastName}`}
        </TableCell>
        <TableCell align="left">{person.email}</TableCell>
        <TableCell align="left">
          <FormControl className={classes.formControl}>
            {/* <Select
                      multiple
                      value={person.groups.filter((item, index, array) => {
                        return (array.length === 1) || (array.length > 1) && (item !== 'Default'))}
                      onChange={handleChange}
                      input={<Input id="select-multiple-checkbox" />}
                      renderValue={selected => selected.join(', ')}
                      MenuProps={MenuProps}
                    >
                      {groups.map(name => (
                        <MenuItem key={name} value={name}>
                          <Checkbox checked={person.groups.indexOf(name) > -1} />
                          <ListItemText primary={name} />
                        </MenuItem>
          ))}
                    </Select> */}
          </FormControl>
        </TableCell>
        <TableCell align="left">{formatDate(person.lastLogin)}</TableCell>
        <TableCell align="left">
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
            <MenuItem onClick={() => {}} disabled>
              Deactivate user
            </MenuItem>
          </Menu>
        </TableCell>
      </TableRow>
    </>
  );
};

PeopleListItem.propTypes = {
  showAddUserModal: PropTypes.func,
  person: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    lastLogin: PropTypes.string,
  }),
};

export default PeopleListItem;
