import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import CircularProgress from '@material-ui/core/CircularProgress';
import AnalyticsTabsHeader from './AnalyticsTabsHeader/AnalyticsTabsHeader';
import AnalyticsTabsPanel from './AnalyticsTabsPanel/AnalyticsTabsPanel';
import DeleteVisualizationWarning from '../DeleteVisualizationWarning/DeleteVisualizationWarning';

const useStyles = makeStyles(() => ({
  tabsButtons: {
    color: '#000000',
    fontWeight: 900,
    maxWidth: `${100 / 3}%`,
    width: '100%',
    borderBottom: '1px solid #f0f0f0',
    '&$selected': {
      color: '#509ee3',
    },
  },
  selected: {},
}));

const AnalyticsTabs = ({ visualizations, dashboards, deleteVisualization, deleteDashboard, isLoading }) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [isWarningVisible, setIsWarningVisible] = React.useState(false);
  const [visualizationIdToDelete, setVisualizationIdToDelete] = React.useState(null);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const onWarningOpen = () => {
    setIsWarningVisible(true);
  };

  const onWarningClose = () => {
    setIsWarningVisible(false);
  };

  const deleteItem = (id) => () => {
    deleteVisualization(id);
  };

  const removeVisualization = (id) => () => {
    const isVisualizationBelongsToDashboard = dashboards.filter((dashboard) => {
      return dashboard.Visualizations.filter((visualization) => visualization.id === id).length !== 0;
    });
    if (isVisualizationBelongsToDashboard.length) {
      setVisualizationIdToDelete(id);
      onWarningOpen();
    } else {
      deleteVisualization(id);
    }
  };

  const removeDashboard = (id) => () => {
    deleteDashboard(id);
  };

  const sortData = (data) => {
    return data.sort((elem, nextElem) => {
      return new Date(elem.updatedAt) - new Date(nextElem.updatedAt);
    });
  };

  return (
    <>
      <DeleteVisualizationWarning
        isVisible={isWarningVisible}
        onClose={onWarningClose}
        deleteVisualization={deleteVisualization}
        visualizationId={visualizationIdToDelete}
      />
      <AnalyticsTabsHeader value={value} onChange={handleChange}>
        <Tab classes={{ root: classes.tabsButtons, selected: classes.selected }} label="Everything" />
        <Tab classes={{ root: classes.tabsButtons, selected: classes.selected }} label="Dashboards" />
        <Tab classes={{ root: classes.tabsButtons, selected: classes.selected }} label="Visualizations" />
      </AnalyticsTabsHeader>
      {isLoading ? (
        <CircularProgress size={40} left={-20} top={-40} style={{ marginLeft: '50%', marginTop: '50%' }} />
      ) : (
        <>
          <AnalyticsTabsPanel
            value={value}
            index={0}
            deleteItem={deleteItem}
            deleteVisualization={removeVisualization}
            deleteDashboard={removeDashboard}
            data={sortData([...visualizations, ...dashboards])}
          />
          <AnalyticsTabsPanel
            value={value}
            index={1}
            deleteVisualization={removeVisualization}
            deleteDashboard={removeDashboard}
            data={sortData(dashboards)}
          />
          <AnalyticsTabsPanel
            value={value}
            index={2}
            deleteVisualization={removeVisualization}
            deleteDashboard={removeDashboard}
            data={sortData(visualizations)}
          />
        </>
      )}
    </>
  );
};

AnalyticsTabs.propTypes = {
  visualizations: PropTypes.array,
  dashboards: PropTypes.array,
  isLoading: PropTypes.bool,
  deleteVisualization: PropTypes.func,
  deleteDashboard: PropTypes.func,
};

export default AnalyticsTabs;
