import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import ViewListOutlinedIcon from '@material-ui/icons/ViewListOutlined';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import SettingsIcon from '@material-ui/icons/Settings';

import { getButtonClasses } from './helper';
import './ViewVisualizationMain.css';

const ViewVisualizationMain = (props) => {
  const { contentViewComponent, currentContentView, visualizationIcon, onToggleSideBar, onSwitchContentView } = props;
  return (
    <Grid className="view-visualization-main" container item xs direction="column" justify="center" alignItems="center">
      <Grid className="view-visualization-content" item xs>
        {contentViewComponent}
      </Grid>
      <Grid item className="view-visualization-footer">
        <Button
          onClick={onToggleSideBar}
          className="view-visualization__setting-button"
          variant="contained"
          startIcon={<SettingsIcon />}
        >
          Settings
        </Button>
        <ButtonGroup className="view-visualization__switcher-container" variant="contained">
          <Button
            className={getButtonClasses('table', currentContentView)}
            onClick={() => onSwitchContentView('table')}
          >
            <ViewListOutlinedIcon />
          </Button>
          <Button
            className={getButtonClasses('chart', currentContentView)}
            onClick={() => onSwitchContentView('chart')}
          >
            {visualizationIcon}
          </Button>
        </ButtonGroup>
      </Grid>
    </Grid>
  );
};

ViewVisualizationMain.propTypes = {
  contentViewComponent: PropTypes.func,
  currentContentView: PropTypes.string,
  visualizationIcon: PropTypes.func,
  onToggleSideBar: PropTypes.func,
  onSwitchContentView: PropTypes.func,
};

export default ViewVisualizationMain;
