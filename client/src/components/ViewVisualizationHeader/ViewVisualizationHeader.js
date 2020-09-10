import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Button, Typography } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import FilterListIcon from '@material-ui/icons/FilterList';
import GamesOutlinedIcon from '@material-ui/icons/GamesOutlined';
import Tooltip from '@material-ui/core/Tooltip';
import Chip from '@material-ui/core/Chip';
import InfoIcon from '@material-ui/icons/Info';
import EditIcon from '@material-ui/icons/Edit';

import useStyles from './styles';

const ViewVisualizationHeader = (props) => {
  const {
    onVisualizationSave,
    onVisualizationNameEdit,
    isVisualizationExist,
    name,
    description,
    visualizationType,
    onToggleRightSideBar,
    datasetSettings,
    updateVisualization,
    onChipCloseRemoveSidebar,
  } = props;
  const classes = useStyles();

  return (
    <Grid className={classes.viewVisualizationHeader}>
      <Grid className={classes.viewVisualizationTitle} item container>
        <Typography className={classes.viewVisualizationTitleName}>
          <span className={classes.viewVisualizationTitleSection}>
            {isVisualizationExist ? 'Visualizations / ' : 'Create Visualization / '}
          </span>
          {isVisualizationExist ? name : ` ${visualizationType}`}
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
            <div>
              {(isVisualizationExist && datasetSettings?.length && (
                <Chip
                  className={classes.toggleFiltersChip}
                  size="small"
                  label="Filters"
                  icon={<FilterListIcon style={{ fill: '#E2E3EF' }} />}
                />
              )) ||
                null}
              {(isVisualizationExist &&
                datasetSettings?.length &&
                datasetSettings.map(({ columnName }, index) => {
                  return (
                    <Chip
                      key={index}
                      size="small"
                      className={classes.chip}
                      label={columnName}
                      onDelete={() => {
                        const newDatasetSettings = datasetSettings.filter(
                          ({ columnName: name }) => name !== columnName
                        );
                        updateVisualization(null, newDatasetSettings);
                        onChipCloseRemoveSidebar();
                      }}
                    />
                  );
                })) ||
                null}
            </div>
          </>
        )}
      </Grid>
      <Grid className={classes.viewVisualizationButtons} item container>
        <Button
          className={classes.viewVisualizationSaveButton}
          variant="contained"
          startIcon={<SaveIcon />}
          onClick={onVisualizationSave}
          id="saveVisualization"
        >
          Save
        </Button>
        {isVisualizationExist && (
          <>
            <Button
              className={classes.viewVisualizationFilterButton}
              variant="contained"
              startIcon={<FilterListIcon />}
              onClick={onToggleRightSideBar(0)}
            >
              Filter
            </Button>
            <Button
              className={classes.viewVisualizationSummarizeButton}
              variant="contained"
              startIcon={<GamesOutlinedIcon />}
              onClick={onToggleRightSideBar(1)}
            >
              Summarize
            </Button>
          </>
        )}
      </Grid>
    </Grid>
  );
};

ViewVisualizationHeader.propTypes = {
  onVisualizationSave: PropTypes.func,
  onVisualizationNameEdit: PropTypes.func,
  isVisualizationExist: PropTypes.bool,
  name: PropTypes.string,
  description: PropTypes.string,
  visualizationType: PropTypes.string,
  onToggleRightSideBar: PropTypes.func,
  datasetSettings: PropTypes.array,
  updateVisualization: PropTypes.func,
  onChipCloseRemoveSidebar: PropTypes.func,
};

export default ViewVisualizationHeader;
