import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Button, Typography } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';
import InfoIcon from '@material-ui/icons/Info';
import EditIcon from '@material-ui/icons/Edit';

import useStyles from './styles';

const ViewVisualizationHeader = (props) => {
  const {
    onVisualizationSave,
    onVisualizationNameEdit,
    onVisualizationDelete,
    isVisualizationExist,
    name,
    description,
    visualizationType,
  } = props;
  const classes = useStyles();

  return (
    <Grid className={classes.viewVisualizationHeader}>
      <Grid className={classes.viewVisualizationTitle} item container>
        <Typography className={classes.viewVisualizationTitleName}>
          <span className={classes.viewVisualizationTitleSection}>
            {isVisualizationExist ? 'Visualizations / ' : 'Create Visualization / '}
          </span>
          {isVisualizationExist ? name : `New ${visualizationType}`}
        </Typography>
        {isVisualizationExist && (
          <>
            {description && description.length && (
              <Tooltip
                classes={{
                  tooltip: classes.viewVisualizationTitleDescription,
                }}
                title={description}
              >
                <InfoIcon className={classes.viewVisualizationTitleIcon} />
              </Tooltip>
            )}

            <EditIcon className={classes.viewVisualizationTitleIcon} onClick={onVisualizationNameEdit} />
          </>
        )}
      </Grid>
      <Grid className={classes.viewVisualizationButtons} item container>
        {isVisualizationExist && (
          <Button
            className={classes.viewVisualizationDeleteButton}
            variant="contained"
            startIcon={<DeleteIcon />}
            onClick={onVisualizationDelete}
          >
            Delete
          </Button>
        )}

        <Button
          className={classes.viewVisualizationSaveButton}
          variant="contained"
          startIcon={<SaveIcon />}
          onClick={onVisualizationSave}
        >
          Save
        </Button>
      </Grid>
    </Grid>
  );
};

ViewVisualizationHeader.propTypes = {
  onVisualizationSave: PropTypes.func,
  onVisualizationNameEdit: PropTypes.func,
  onVisualizationDelete: PropTypes.func,
  isVisualizationExist: PropTypes.bool,
  name: PropTypes.string,
  description: PropTypes.string,
  visualizationType: PropTypes.string,
};

export default ViewVisualizationHeader;
