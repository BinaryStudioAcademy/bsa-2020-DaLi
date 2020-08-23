import React from 'react';
import PropTypes from 'prop-types';
import { WidthProvider, Responsive } from 'react-grid-layout';

import './DashboardLayoutStyles.css';

const ResponsiveReactGridLayout = WidthProvider(Responsive);
const DashboardLayout = (props) => {
  const {
    viewDashboardMode,
    layout,
    layouts,
    dashboardVisualizations,
    onLayoutChange,
    onBreakpointChange,
    getDashboardItems,
    onVisualizationDelete,
  } = props;

  const isEditMode = viewDashboardMode === 'edit';
  const getDashboardLayoutClasses = () => {
    switch (viewDashboardMode) {
      case 'edit':
        return 'dashboard-container dashboard-container--edit';
      case 'full-screen':
        return 'dashboard-container dashboard-container--full-screen';
      default:
        return 'dashboard-container';
    }
  };

  const dashboardLayoutClasses = getDashboardLayoutClasses();
  const dashboardItems = getDashboardItems(dashboardVisualizations, layout, onVisualizationDelete);

  return (
    <div className={dashboardLayoutClasses}>
      <ResponsiveReactGridLayout
        isDraggable={isEditMode}
        isResizable={isEditMode}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={100}
        layout={layout}
        layouts={layouts}
        onLayoutChange={onLayoutChange}
        onBreakpointChange={onBreakpointChange}
      >
        {dashboardItems}
      </ResponsiveReactGridLayout>
    </div>
  );
};
DashboardLayout.propTypes = {
  viewDashboardMode: PropTypes.bool,
  layout: PropTypes.array,
  layouts: PropTypes.object,
  data: PropTypes.array,
  dashboardVisualizations: PropTypes.array,
  onLayoutChange: PropTypes.func,
  onBreakpointChange: PropTypes.func,
  getDashboardItems: PropTypes.func,
  onVisualizationDelete: PropTypes.func,
};

export default DashboardLayout;
