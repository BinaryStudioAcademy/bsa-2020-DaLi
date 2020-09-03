import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography, Button, TextField } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

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
  return (
    <Grid container>
      <Grid item container>
        <Typography>You are editing a dashboard</Typography>
        <Grid>
          <Button onClick={onCancelChanges}>Cancel</Button>
          <Button onClick={onSaveChanges}>Save</Button>
        </Grid>
      </Grid>
      <Grid item container>
        <Grid item container>
          <TextField
            inputProps={{
              style: { fontSize: 15 },
            }}
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
            defaultValue={description}
            variant="outlined"
            size="small"
            placeholder="Dashboard description"
            onChange={onDescriptionChange}
          />
        </Grid>
        <AddIcon fontSize="large" onClick={onVisualizationAdd} />
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
