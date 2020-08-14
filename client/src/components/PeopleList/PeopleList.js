import React from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Avatar from '@material-ui/core/Avatar';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
// import Select from '@material-ui/core/Select';
// import Checkbox from '@material-ui/core/Checkbox';
// import Input from '@material-ui/core/Input';
// import InputLabel from '@material-ui/core/InputLabel';
// import ListItemText from '@material-ui/core/ListItemText';
import FormControl from '@material-ui/core/FormControl';
import PeopleListHeader from '../PeopleListHeader';
import { colorStyles, useStyles } from './styles';
import { mockPeople } from './mockPeople';

const getInitials = (person) => {
  const name = `${person.firstName} ${person.lastName}`;
  return name
    .split(' ')
    .map((word) => word[0])
    .join('');
};

const PeopleList = ({ people = mockPeople, addUser }) => {
  const [menuAnchorEl, setMenuAnchorEl] = React.useState(null);
  const classes = useStyles();
  const colors = colorStyles();

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

  const handleMenuClick = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  // const handleChange = (event) => {
  //   // setGroups(event.target.value);
  // };

  return (
    <div>
      <PeopleListHeader addUser={addUser} />
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
                <TableCell align="left">{person.lastLogin}</TableCell>
                <TableCell align="left">
                  <MoreHorizIcon className={classes.dots} onClick={handleMenuClick} />
                  <Menu
                    id="add-menu"
                    anchorEl={menuAnchorEl}
                    keepMounted
                    open={Boolean(menuAnchorEl)}
                    onClose={() => setMenuAnchorEl(null)}
                  >
                    <MenuItem onClick={() => {}}>Edit user</MenuItem>
                    <MenuItem onClick={() => {}}>Reset password</MenuItem>
                    <MenuItem onClick={() => {}}>Deactivate user</MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

PeopleList.propTypes = {
  people: PropTypes.array,
  addUser: PropTypes.func,
};

export default PeopleList;
