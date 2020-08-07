import React from 'react';

import EqualizerOutlinedIcon from '@material-ui/icons/EqualizerOutlined';
import TimelineOutlinedIcon from '@material-ui/icons/TimelineOutlined';
import TableChartOutlinedIcon from '@material-ui/icons/TableChartOutlined';

import BarChart from '../BarChartContainer/BarChartContainer';
import LineChart from '../LineChartContainer/LineChartContainer';
import TableVisualization from '../TableVisualizationContainer/TableVisualizationContainer';

export const getVisualizationComponent = (visualizationType) => {
  switch (visualizationType) {
    case 'BAR_CHART':
      return <BarChart />;
    case 'LINE_CHART':
      return <LineChart />;
    case 'TABLE':
      return <TableVisualization />;
    default:
      return null;
  }
};

export const getVisualizationIcon = (visualizationType) => {
  switch (visualizationType) {
    case 'BAR_CHART':
      return <EqualizerOutlinedIcon />;
    case 'LINE_CHART':
      return <TimelineOutlinedIcon />;
    case 'TABLE':
      return <TableChartOutlinedIcon />;
    default:
      return null;
  }
};
