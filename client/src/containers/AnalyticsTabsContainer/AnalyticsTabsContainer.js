import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAnalytics, deleteVisualization } from './actions';
import AnalyticsTabs from '../../components/AnalyticsTabs/AnalyticsTabs';

const AnalyticsTabsContainer = ({ getAnalytics, deleteVisualization, visualizations, dashboards, isLoading }) => {
  useEffect(() => {
    getAnalytics();
  }, [getAnalytics]);

  return (
    <AnalyticsTabs
      visualizations={visualizations}
      dashboards={dashboards}
      deleteVisualization={deleteVisualization}
      isLoading={isLoading}
    />
  );
};

AnalyticsTabsContainer.propTypes = {
  visualizations: PropTypes.array,
  dashboards: PropTypes.array,
  isLoading: PropTypes.bool,
  getAnalytics: PropTypes.func,
  deleteVisualization: PropTypes.func,
};

const mapStateToProps = ({ analytics }) => ({
  visualizations: analytics.visualizations,
  dashboards: analytics.dashboards,
  isLoading: analytics.isLoading,
  error: analytics.error,
});

const mapDispatchToProps = { getAnalytics, deleteVisualization };

export default connect(mapStateToProps, mapDispatchToProps)(AnalyticsTabsContainer);
