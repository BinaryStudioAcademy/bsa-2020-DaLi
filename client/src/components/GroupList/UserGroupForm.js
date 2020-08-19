import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { useStyles } from './styles';

const ValidationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
});

const UserGroupForm = ({initialName, submit, closeForm, submitTitle}) => {
  return (
      <TableRow>
        <TableCell colSpan={3}>
          <Formik
              initialValues={{ name: initialName }}
              validationSchema={ValidationSchema}
              onSubmit={(values) => submit(values)}
          >
            {/* eslint-disable-next-line */}
            {(props) => <CreateUserGroupForm cancel={closeForm} submitTitle={submitTitle} {...props}/>}
          </Formik>
        </TableCell>
      </TableRow>
  );
};

const CreateUserGroupForm = ({ handleSubmit, resetForm, isValid, dirty, cancel, submitTitle }) => {
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
            {submitTitle}
          </Button>
        </div>
      </Form>
  );
};

UserGroupForm.propTypes = {
  initialName: PropTypes.string,
  submit: PropTypes.func,
  closeForm: PropTypes.func,
  submitTitle: PropTypes.string,
};

CreateUserGroupForm.propTypes = {
  handleSubmit: PropTypes.func,
  resetForm: PropTypes.func,
  isValid: PropTypes.bool,
  dirty: PropTypes.bool,
  cancel: PropTypes.func,
  submitTitle: PropTypes.string,
};

export default UserGroupForm;
