import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
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
import GroupListHeader from '../GroupListHeader';
import { useStyles } from './styles';
// import { mockPeople } from './mockPeople';

const groups = [
  { name: 'Administrators', members: 2 },
  { name: 'All users', members: 4 },
];

const GroupList = () => {
  const history = useHistory();
  const [menuAnchorEl, setMenuAnchorEl] = React.useState(null);
  const classes = useStyles();
  // const [groups, setGroups] = React.useState(['Admin', 'Default']);

  const handleMenuClick = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  // const handleChange = (event) => {
  //   // setGroups(event.target.value);
  // };

  return (
    <div className={classes.root}>
      <GroupListHeader />
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
            {groups.map((group) => (
              <TableRow key={group.name}>
                <TableCell align="left" className={classes.name}>
                  <Avatar className={classes.avatar}>{group.name[0]}</Avatar>
                  {group.name}
                </TableCell>
                <TableCell align="left">{group.members}</TableCell>
                <TableCell align="left">
                  <MoreHorizIcon className={classes.dots} onClick={handleMenuClick} />
                  <Menu
                    id="add-menu"
                    anchorEl={menuAnchorEl}
                    keepMounted
                    open={Boolean(menuAnchorEl)}
                    onClose={() => setMenuAnchorEl(null)}
                  >
                    <MenuItem onClick={() => {}}>Edit name</MenuItem>
                    <MenuItem onClick={() => {}}>Remove group</MenuItem>
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

export default GroupList;
