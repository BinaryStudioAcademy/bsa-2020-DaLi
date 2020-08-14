import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getVisualizations, deleteVisualization, resetError } from '../VisualizationsListContainer/actions';
import AnalyticsTabs from '../../components/AnalyticsTabs/AnalyticsTabs';

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

const AnalyticsTabsContainer = ({ visualizations, getVisualizations, deleteVisualization, resetError, isLoading }) => {
  useEffect(() => {
    getVisualizations();
    return () => {
      resetError();
    };
  }, [getVisualizations, resetError]);

  return (
    <AnalyticsTabs
      visualizations={visualizations}
      dashboards={mockDashboards}
      deleteVisualization={deleteVisualization}
      isLoading={isLoading}
    />
  );
};

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
