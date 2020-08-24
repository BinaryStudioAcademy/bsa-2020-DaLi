import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography, Button, TextField } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import useStyles from './styles';

const DashboardHeaderEdit = (props) => {
  const {
    name,
    description,
    onCancelChanges,
    onSaveChanges,
    onVisualizationAdd,
    onNameChange,
    onDescriptionChange,
  } = props;
  const classes = useStyles();
  return (
    <Grid className={classes.dashboardEditingHeader} container>
      <Grid className={classes.dashboardEditingHeaderTop} item container>
        <Typography className={classes.dashboardEditingHeaderTitle}>You are editing a dashboard</Typography>
        <Grid className={classes.dashboardEditingHeaderButtons}>
          <Button
            className={`${classes.dashboardEditingHeaderButton} ${classes.dashboardEditingHeaderButtonCancel}`}
            onClick={onCancelChanges}
          >
            Cancel
          </Button>
          <Button
            className={`${classes.dashboardEditingHeaderButton} ${classes.dashboardEditingHeaderButtonSave}`}
            onClick={onSaveChanges}
          >
            Save
          </Button>
        </Grid>
      </Grid>
      <Grid className={classes.dashboardEditingHeaderBottom} item container>
        <Grid className={classes.dashboardEditingHeaderInputs} item container>
          <TextField
            inputProps={{
              style: { fontSize: 15 },
            }}
            FormHelperTextProps={{
              className: classes.dashboardEditingHeaderHelperText,
            }}
            className={classes.dashboardEditingHeaderInput}
            helperText={!name.length && 'Dashboard name is required'}
            error={!name.length}
            id="outlined-error-helper-text"
            defaultValue={name}
            variant="outlined"
            size="small"
            placeholder="Dashboard name"
            onChange={onNameChange}
          />
          <TextField
            inputProps={{
              style: { fontSize: 15 },
            }}
            className={classes.dashboardEditingHeaderInput}
            defaultValue={description}
            variant="outlined"
            size="small"
            placeholder="Dashboard description"
            onChange={onDescriptionChange}
          />
        </Grid>
        <AddIcon fontSize="large" onClick={onVisualizationAdd} className={classes.dashboardAddVisualisationBtn}/>
      </Grid>
    </Grid>
  );
};

DashboardHeaderEdit.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  onCancelChanges: PropTypes.func,
  onSaveChanges: PropTypes.func,
  onVisualizationAdd: PropTypes.func,
  onNameChange: PropTypes.func,
  onDescriptionChange: PropTypes.func,
};

export default DashboardHeaderEdit;
