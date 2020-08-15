import React from 'react';
import PropTypes from 'prop-types';
import { WidthProvider, Responsive } from 'react-grid-layout';

import './DashboardLayoutStyles.css';

const ResponsiveReactGridLayout = WidthProvider(Responsive);
const DashboardLayout = (props) => {
  const { layout, layouts, isEdit, onLayoutChange, onBreakpointChange } = props;

  const dashboardLayoutClasses = isEdit ? 'dashboard-container dashboard-container--edit' : 'dashboard-container';

  return (
    <div className={dashboardLayoutClasses}>
      <ResponsiveReactGridLayout
        isDraggable={isEdit}
        isResizable={isEdit}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={100}
        layout={layout}
        layouts={layouts}
        onLayoutChange={onLayoutChange}
        onBreakpointChange={onBreakpointChange}
      >
        {layout.map((item) => (
          <div className="dashboard-layout__item" key={item.i} data-grid={item}>
            <span className="text">{item.i}</span>
          </div>
        ))}
      </ResponsiveReactGridLayout>
    </div>
  );
};

DashboardLayout.propTypes = {
  layout: PropTypes.array,
  isEdit: PropTypes.bool,
  layouts: PropTypes.object,
  onLayoutChange: PropTypes.func,
  onBreakpointChange: PropTypes.func,
};

export default DashboardLayout;
