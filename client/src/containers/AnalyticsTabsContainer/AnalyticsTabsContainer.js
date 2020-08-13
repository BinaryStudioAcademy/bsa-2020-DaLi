import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import { TabsPanel, TabsHeader } from '../../components';
import { getVisualizations, deleteVisualization, resetError } from '../VisualizationsListContainer/actions';

const mockDashboards = [
  {
    id: '123123',
    name: 'Dashboard 1',
    description: 'Dashboard 1 description',
    updatedAt: '2020-08-10T19:42:13.229Z',
  },
  {
    id: '123122123123123',
    name: 'Dashboard 2',
    description: 'Dashboard 2 description',
    updatedAt: '2020-08-10T19:20:13.229Z',
  },
  {
    id: '12123123123123123',
    name: 'Dashboard 3',
    description: 'Dashboard 3 description',
    updatedAt: '2020-08-10T19:21:13.229Z',
  },
  {
    id: '123121231231231233',
    name: 'Dashboard 4',
    description: 'Dashboard 4 description',
    updatedAt: '2020-08-10T19:24:13.229Z',
  },
];

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

function AnalyticsTabsContainer({ visualizations, getVisualizations, deleteVisualization, resetError, isLoading }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }
  useEffect(() => {
    getVisualizations();
    return () => {
      resetError();
    };
  }, [getVisualizations, resetError]);

  const deleteItem = (id) => () => {
    deleteVisualization(id);
  };

  const sortData = (data) => {
    return data.sort((elem, nextElem) => {
      return new Date(elem.updatedAt) - new Date(nextElem.updatedAt);
    });
  };

  return (
    <>
      <TabsHeader value={value} onChange={handleChange}>
        <Tab classes={{ root: classes.tabsButtons, selected: classes.selected }} label="Everything" fullWidth />
        <Tab classes={{ root: classes.tabsButtons, selected: classes.selected }} label="Dashboards" fullWidth />
        <Tab classes={{ root: classes.tabsButtons, selected: classes.selected }} label="Visualizations" fullWidth />
      </TabsHeader>
      {!isLoading ? (
        <>
          <TabsPanel
            value={value}
            index={0}
            deleteItem={deleteItem}
            data={sortData([...visualizations, ...mockDashboards])}
          />
          <TabsPanel value={value} index={1} deleteItem={deleteItem} data={sortData(mockDashboards)} />
          <TabsPanel value={value} index={2} deleteItem={deleteItem} data={sortData(visualizations)} />
        </>
      ) : null}
    </>
  );
}

AnalyticsTabsContainer.propTypes = {
  visualizations: PropTypes.array,
  isLoading: PropTypes.bool,
  getVisualizations: PropTypes.func,
  deleteVisualization: PropTypes.func,
  resetError: PropTypes.func,
};

const mapStateToProps = ({ visualizations }) => ({
  visualizations: visualizations.visualizations,
  isLoading: visualizations.isLoading,
});

const mapDispatchToProps = { getVisualizations, deleteVisualization, resetError };

export default connect(mapStateToProps, mapDispatchToProps)(AnalyticsTabsContainer);
