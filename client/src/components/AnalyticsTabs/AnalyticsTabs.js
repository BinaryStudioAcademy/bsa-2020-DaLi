import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import CircularProgress from '@material-ui/core/CircularProgress';
import AnalyticsTabsHeader from './AnalyticsTabsHeader/AnalyticsTabsHeader';
import AnalyticsTabsPanel from './AnalyticsTabsPanel/AnalyticsTabsPanel';

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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const deleteItem = (id) => () => {
    deleteVisualization(id);
  };

  const removeVisualization = (id) => () => {
    deleteVisualization(id);
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
