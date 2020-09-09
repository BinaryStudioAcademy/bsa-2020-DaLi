import React from 'react';
import {
  Grid,
  Typography,
  Snackbar,
  Breadcrumbs,
  Box,
  TextField,
  Button,
  FormControl,
  NativeSelect,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage, getIn } from 'formik';
import { useHistory, NavLink } from 'react-router-dom';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import StyledNavLink from '../../theme/StyledNavLink';
import { addDatabase } from '../DatabasesPageContainer/actions';
import { hideNotification } from './actions';

import './styles.css';

const AddDatabaseSchema = Yup.object().shape({
  type: Yup.string().required('Required'),
  name: Yup.string().min(4).required('Required'),
  host: Yup.string().required('Required'),
  port: Yup.string().matches(/^\d+$/, 'The field should have digits only').required('Required'),
  databaseName: Yup.string().required('Required'),
  username: Yup.string().required('Required'),
  password: Yup.string().max(100).required('Required'),
});

const getStyles = (errors, touched, fieldName) => {
  return getIn(errors, fieldName) && getIn(touched, fieldName)
    ? { borderRadius: '5px', backgroundColor: 'rgba(255, 0, 0, 0.3)' }
    : {};
};

const ConnectionDatabaseContainer = ({ addDatabase, isNotification, message, status, hideNotification }) => {
  const availableDatabases = { PostgreSQL: 5432, MySQL: 3306, MongoDB: 27017 };

  const initialDatabaseValues = {
    type: Object.keys(availableDatabases)[0],
    name: '',
    host: '',
    port: Object.values(availableDatabases)[0],
    databaseName: '',
    username: '',
    password: '',
  };
  const history = useHistory();

  const databaseOptions = Object.keys(availableDatabases).map((value) => (
    <option value={value} key={value}>
      {value}
    </option>
  ));

  const onSaveClick = (values) => {
    addDatabase({
      data: {
        dbNickname: values.name,
        type: values.type,
        host: values.host,
        port: Number.parseInt(values.port),
        dbName: values.databaseName,
        username: values.username,
        dbPassword: values.password,
      },
      history,
    });
  };

  return (
    <div className="wrapper">
      <Breadcrumbs separator={<NavigateNextIcon />} aria-label="breadcrumb" style={{ marginTop: '10px' }}>
        <StyledNavLink>
          <NavLink
            to={{
              pathname: '/admin/databases',
            }}
          >
            Databases
          </NavLink>
        </StyledNavLink>
        <Typography variant="body2" color="primary">
          Add database
        </Typography>
      </Breadcrumbs>
      <Grid xs item container direction="column" alignItems="center">
        <Box className="add-database-form-wrapper">
          <Formik
            initialValues={{ ...initialDatabaseValues }}
            validationSchema={AddDatabaseSchema}
            onSubmit={(values) => onSaveClick(values)}
          >
            {({ errors, touched, setFieldValue, values, isValid, dirty }) => (
              <Form>
                <FormControl>
                  <Typography variant="subtitle2" htmlFor="type">
                    Database type
                  </Typography>
                  <NativeSelect
                    className="add-database-select"
                    variant="outlined"
                    onChange={(event) => {
                      setFieldValue('port', availableDatabases[event.target.value]);
                      setFieldValue('type', event.target.value);
                    }}
                    value={values.type}
                    name="type"
                    id="type"
                  >
                    {databaseOptions}
                  </NativeSelect>
                </FormControl>
                <Typography variant="subtitle2" htmlFor="name">
                  Name
                </Typography>
                <Field
                  as={TextField}
                  name="name"
                  id="name"
                  variant="outlined"
                  placeholder="How would you like to refer to this database?"
                  style={getStyles(errors, touched, 'name')}
                />
                <ErrorMessage name="name" component="div" className="error" />
                <Typography variant="subtitle2" htmlFor="host">
                  Host
                </Typography>
                <Field
                  as={TextField}
                  name="host"
                  id="host"
                  variant="outlined"
                  placeholder="localhost"
                  style={getStyles(errors, touched, 'host')}
                />
                <ErrorMessage name="host" component="div" className="error" />
                <Typography variant="subtitle2" htmlFor="port">
                  Port
                </Typography>
                <Field
                  as={TextField}
                  name="port"
                  id="port"
                  variant="outlined"
                  placeholder="5432"
                  style={getStyles(errors, touched, 'port')}
                />
                <ErrorMessage name="port" component="div" className="error" />
                <Typography variant="subtitle2" htmlFor="databaseName">
                  Database name
                </Typography>
                <Field
                  as={TextField}
                  name="databaseName"
                  id="databaseName"
                  variant="outlined"
                  placeholder="Your database name"
                  style={getStyles(errors, touched, 'databaseName')}
                />
                <ErrorMessage name="databaseName" component="div" className="error" />
                <Typography variant="subtitle2" htmlFor="username">
                  User name
                </Typography>
                <Field
                  as={TextField}
                  name="username"
                  id="username"
                  variant="outlined"
                  placeholder="What username do you use to login to the database"
                  style={getStyles(errors, touched, 'username')}
                />
                <ErrorMessage name="username" component="div" className="error" />
                <Typography variant="subtitle2" htmlFor="password">
                  Password
                </Typography>
                <Field
                  as={TextField}
                  type="password"
                  name="password"
                  id="password"
                  variant="outlined"
                  placeholder="Shhh..."
                  style={getStyles(errors, touched, 'password')}
                />
                <ErrorMessage name="password" component="div" className="error" />
                <div className="add-database-btn-container">
                  <Button
                    size="large"
                    variant="contained"
                    color="primary"
                    type="submit"
                    style={{ margin: '25px 0' }}
                    disabled={!(isValid && dirty)}
                  >
                    Save
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Box>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={isNotification}
          autoHideDuration={6000}
          onClose={hideNotification}
        >
          <Alert elevation={6} variant="filled" severity={status} onClose={hideNotification}>
            {message}
          </Alert>
        </Snackbar>
      </Grid>
    </div>
  );
};

const mapStateToProps = ({ admin: { connectionDatabase } }) => ({
  isNotification: connectionDatabase.isNotification,
  message: connectionDatabase.message,
  status: connectionDatabase.status,
});

ConnectionDatabaseContainer.propTypes = {
  addDatabase: PropTypes.func,
  isNotification: PropTypes.bool,
  message: PropTypes.string,
  status: PropTypes.string,
  hideNotification: PropTypes.func,
};
const mapDispatchToProps = { addDatabase, hideNotification };

export default connect(mapStateToProps, mapDispatchToProps)(ConnectionDatabaseContainer);
