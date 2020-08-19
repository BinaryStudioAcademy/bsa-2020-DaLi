import React, { useState } from 'react';
// import { NavLink, useHistory } from 'react-router-dom';
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
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { useStyles } from './styles';
import GroupListHeader from '../GroupListHeader';

const ValidationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
});

const GroupList = ({ groups, addUserGroup, deleteGroup }) => {
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
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

  const handleMenuClick = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  // const handleChange = (event) => {
  //   // setGroups(event.target.value);
  // };

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
            {isVisibleForm && (
              <TableRow>
                <TableCell colSpan={3}>
                  <Formik
                    initialValues={{ name: '' }}
                    validationSchema={ValidationSchema}
                    onSubmit={(values) => createUserGroup(values)}
                  >
                    {/* eslint-disable-next-line */}
                  {(props) => <CreateUserGroupForm cancel={closeForm} {...props}/>}
                  </Formik>
                </TableCell>
              </TableRow>
            )}
            {groups.map((group) => (
              <TableRow key={group.name}>
                <TableCell align="left" className={classes.name}>
                  <Avatar className={classes.avatar}>{group.name[0]}</Avatar>
                  {group.name}
                </TableCell>
                <TableCell align="left">{/* {group.members} */}???</TableCell>
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
                    <MenuItem onClick={deleteGroup(group.id)}>Remove group</MenuItem>
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

const CreateUserGroupForm = ({ handleSubmit, resetForm, isValid, dirty, cancel }) => {
  const classes = useStyles();
  return (
    <Form className={classes.form} onSubmit={handleSubmit}>
      <Field name="name" as="input" placeholder='Something like "Marketing"' />
      <div>
        <Button onClick={cancel(resetForm)} style={{ textTransform: 'none', fontSize: 12, color: '#3ca1de' }}>
          Cancel
        </Button>
        <Button
          type="submit"
          variant="outlined"
          disabled={!(isValid && dirty)}
          style={{ textTransform: 'none', fontSize: 12 }}
        >
          Add
        </Button>
      </div>
    </Form>
  );
};

GroupList.propTypes = {
  groups: PropTypes.array,
  addUserGroup: PropTypes.func,
  deleteGroup: PropTypes.func,
};
CreateUserGroupForm.propTypes = {
  handleSubmit: PropTypes.func,
  resetForm: PropTypes.func,
  isValid: PropTypes.bool,
  dirty: PropTypes.bool,
  cancel: PropTypes.func,
};

export default GroupList;
