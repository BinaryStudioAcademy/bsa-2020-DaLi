import React from 'react';
import { Grid, Typography, Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage, getIn } from 'formik';
import NativeSelect from '@material-ui/core/NativeSelect';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import useStyles from './styles';
import { addDatabase } from '../DatabasesPageContainer/actions';
import { hideNotification } from './actions';

const AddDatabaseSchema = Yup.object().shape({
  type: Yup.string().required('Required'),
  name: Yup.string().min(4).required('Required'),
  host: Yup.string().required('Required'),
  port: Yup.string().matches(/^\d+$/, 'The field should have digits only').required('Required'),
  databaseName: Yup.string().required('Required'),
  username: Yup.string().required('Required'),
  password: Yup.string().max(30).required('Required'),
});

const getStyles = (errors, touched, fieldName) => {
  return getIn(errors, fieldName) && getIn(touched, fieldName) ? { border: '1px solid red' } : {};
};

const ConnectionDatabaseContainer = ({ addDatabase, isNotification, message, status, hideNotification }) => {
  const availableDatabases = ['PostgreSQL', 'MongoDB'];
  const classes = useStyles();
  const initialDatabaseValues = {
    type: availableDatabases[0],
    name: '',
    host: '',
    port: '',
    databaseName: '',
    username: '',
    password: '',
  };
  const history = useHistory();

  const databaseOptions = availableDatabases.map((value) => (
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
    <Grid className={classes.content} xs item container direction="column" alignItems="center">
      <Typography className={classes.titleName}>
        <span className={classes.titleSection}>
          DATABASES <span className={classes.emptySpace}> &gt; </span>
          <span style={{ color: '#000' }}>ADD DATABASE</span>
        </span>
      </Typography>
      <div className={classes.wrapper}>
        <Formik
          initialValues={{ ...initialDatabaseValues }}
          validationSchema={AddDatabaseSchema}
          onSubmit={(values) => onSaveClick(values)}
        >
          {({ errors, touched, setFieldValue, values, isValid, dirty }) => (
            <Form>
              <div className={classes.relative}>
                <label htmlFor="type" className={classes.label}>
                  Database type
                </label>
                <NativeSelect
                  onChange={(event) => setFieldValue('type', event.target.value)}
                  value={values.type}
                  name="type"
                  id="type"
                  className={classes.nativeSelect}
                >
                  {databaseOptions}
                </NativeSelect>
              </div>
              <div className={classes.relative}>
                <label htmlFor="name" className={classes.label}>
                  Name
                </label>
                <Field
                  type="text"
                  name="name"
                  id="name"
                  placeholder="How would you like to refer to this database?"
                  className={` textInput ${classes.field}`}
                  style={getStyles(errors, touched, 'name')}
                />
                <ErrorMessage name="name" component="div" className={classes.error} />
              </div>
              <div className={classes.relative}>
                <label htmlFor="host" className={classes.label}>
                  Host
                </label>
                <Field
                  type="host"
                  name="host"
                  id="host"
                  placeholder="localhost"
                  className={` textInput ${classes.field}`}
                  style={getStyles(errors, touched, 'host')}
                />
                <ErrorMessage name="host" component="div" className={classes.error} />
              </div>
              <div className={classes.relative}>
                <label htmlFor="port" className={classes.label}>
                  Port
                </label>
                <Field
                  type="text"
                  name="port"
                  id="port"
                  placeholder="5432"
                  className={` textInput ${classes.field}`}
                  style={getStyles(errors, touched, 'port')}
                />
                <ErrorMessage name="port" component="div" className={classes.error} />
              </div>
              <div className={classes.relative}>
                <label htmlFor="databaseName" className={classes.label}>
                  Database name
                </label>
                <Field
                  type="text"
                  name="databaseName"
                  id="databaseName"
                  placeholder="Your database name"
                  className={` textInput ${classes.field}`}
                  style={getStyles(errors, touched, 'databaseName')}
                />
                <ErrorMessage name="databaseName" component="div" className={classes.error} />
              </div>
              <div className={classes.relative}>
                <label htmlFor="username" className={classes.label}>
                  User name
                </label>
                <Field
                  type="text"
                  name="username"
                  id="username"
                  placeholder="What username do you use to login to the database"
                  className={` textInput ${classes.field}`}
                  style={getStyles(errors, touched, 'username')}
                />
                <ErrorMessage name="username" component="div" className={classes.error} />
              </div>
              <div className={classes.relative}>
                <label htmlFor="password" className={classes.label}>
                  Password
                </label>
                <Field
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Shhh..."
                  className={` textInput ${classes.field}`}
                  style={getStyles(errors, touched, 'password')}
                />
                <ErrorMessage name="password" component="div" className={classes.error} />
              </div>
              <button type="submit" className={`btn btn-submit ${classes.save}`} disabled={!(isValid && dirty)}>
                Save
              </button>
            </Form>
          )}
        </Formik>
      </div>
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
