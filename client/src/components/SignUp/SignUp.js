import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  card: {
    maxWidth: 420,
    marginTop: 50,
  },
  container: {
    display: 'Flex',
    justifyContent: 'center',
  },
  actions: {
    float: 'right',
  },
  nameContainer: {
    display: 'flex',
    '& > :first-child': {
      marginRight: 5,
    },
    cardHeader: {
      color: 'grey',
      paddingLeft: '15px',
    },
  },
}));
const SignUp = ({ values, touched, errors, handleChange, handleBlur, handleReset, handleSubmit, isValid, dirty }) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <form onSubmit={handleSubmit}>
        <Card className={classes.card}>
          <CardContent>
            <p className={classes.cardHeader}>Setting up an admin account</p>
            <div className={classes.nameContainer}>
              <TextField
                id="firstName"
                label="First Name"
                value={values.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={touched.firstName ? errors.firstName : ''}
                error={touched.firstName && Boolean(errors.firstName)}
                margin="dense"
                variant="outlined"
              />
              <TextField
                id="lastName"
                label="Last Name"
                value={values.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={touched.lastName ? errors.lastName : ''}
                error={touched.lastName && Boolean(errors.lastName)}
                margin="dense"
                variant="outlined"
              />
            </div>
            <TextField
              id="email"
              label="Email"
              type="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.email ? errors.email : ''}
              error={touched.email && Boolean(errors.email)}
              margin="dense"
              variant="outlined"
              fullWidth
            />
            <TextField
              id="password"
              label="Password"
              type="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.password ? errors.password : ''}
              error={touched.password && Boolean(errors.password)}
              margin="dense"
              variant="outlined"
              fullWidth
            />
            <TextField
              id="confirmPassword"
              label="Confirm Password"
              type="password"
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.confirmPassword ? errors.confirmPassword : ''}
              error={touched.confirmPassword && Boolean(errors.confirmPassword)}
              margin="dense"
              variant="outlined"
              fullWidth
            />
            <TextField
              id="companyName"
              label="Company Name"
              value={values.companyName}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.companyName ? errors.companyName : ''}
              error={touched.companyName && Boolean(errors.companyName)}
              margin="dense"
              variant="outlined"
              fullWidth
            />
          </CardContent>
          <CardActions className={classes.actions}>
            <Button type="submit" color="primary" disabled={!(isValid && dirty)}>
              SUBMIT
            </Button>
            <Button color="secondary" onClick={handleReset}>
              CLEAR
            </Button>
          </CardActions>
        </Card>
      </form>
    </div>
  );
};

SignUp.propTypes = {
  values: PropTypes.object,
  touched: PropTypes.object,
  errors: PropTypes.object,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  handleSubmit: PropTypes.func,
  handleReset: PropTypes.func,
  isValid: PropTypes.bool,
  dirty: PropTypes.bool,
};

export default SignUp;
