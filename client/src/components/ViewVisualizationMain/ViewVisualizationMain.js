import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import ViewListOutlinedIcon from '@material-ui/icons/ViewListOutlined';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import SettingsIcon from '@material-ui/icons/Settings';
import AppsIcon from '@material-ui/icons/Apps';
import CircularProgress from '@material-ui/core/CircularProgress';

import { getButtonClasses } from './helper';
import './ViewVisualizationMain.css';

const ViewVisualizationMain = (props) => {
  const {
    contentViewComponent,
    currentContentView,
    visualizationIcon,
    onSwitchContentView,
    isVisualizationExist,
    onToggleSideBar,
    visualizationLoading,
  } = props;
  return (
    <Grid className="view-visualization-main" container item xs direction="column" justify="center" alignItems="center">
      <Grid className="view-visualization-content" item xs id="visualizationContent">
        {visualizationLoading ? (
          <div style={{ position: 'relative' }}>
            <CircularProgress size={40} left={-20} top={10} style={{ marginLeft: '50%', marginTop: '35%' }} />
          </div>
        ) : (
          contentViewComponent
        )}
      </Grid>
      <Grid item className="view-visualization-footer">
        <Button
          onClick={() => {
            onToggleSideBar(1);
          }}
          className="view-visualization__visualization-button"
          style={!isVisualizationExist ? {} : { display: 'none' }}
          variant="contained"
          color="primary"
          startIcon={<AppsIcon />}
          id="toggleVisualizationSideBar"
        >
          Visualization
        </Button>
        <Button
          onClick={() => {
            onToggleSideBar(0);
          }}
          color="primary"
          className="view-visualization__setting-button"
          variant="contained"
          startIcon={<SettingsIcon />}
          id="toggleConfigSettingsSideBar"
        >
          Settings
        </Button>

        <ButtonGroup className="view-visualization__switcher-container" variant="contained">
          <Button
            className={getButtonClasses('table', currentContentView)}
            onClick={() => onSwitchContentView('table')}
            // variant="contained"
            // color="primary"
            id="toggleInitialTable"
          >
            <ViewListOutlinedIcon />
          </Button>
          <Button
            className={getButtonClasses('chart', currentContentView)}
            // variant="contained"
            // color="primary"
            onClick={() => onSwitchContentView('chart')}
            id="toggleChart"
          >
            {visualizationIcon}
          </Button>
        </ButtonGroup>
      </Grid>
    </Grid>
  );
};

ViewVisualizationMain.propTypes = {
  contentViewComponent: PropTypes.object,
  currentContentView: PropTypes.string,
  visualizationIcon: PropTypes.object,
  onSwitchContentView: PropTypes.func,
  isVisualizationExist: PropTypes.bool,
  onVisualizationButtonClick: PropTypes.func,
  onToggleSideBar: PropTypes.func,
  visualizationLoading: PropTypes.bool,
};

export default ViewVisualizationMain;
