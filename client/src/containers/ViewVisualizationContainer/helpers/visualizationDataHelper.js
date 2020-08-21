import React from 'react';

import EqualizerOutlinedIcon from '@material-ui/icons/EqualizerOutlined';
import TimelineOutlinedIcon from '@material-ui/icons/TimelineOutlined';
import TableChartOutlinedIcon from '@material-ui/icons/TableChartOutlined';

import BarChart from '../../BarChartContainer/BarChartContainer';
import LineChart from '../../LineChartContainer/LineChartContainer';
import TableVisualization from '../../TableVisualizationContainer/TableVisualizationContainer';

import { BarChartSettings, LineChartSettings, TableSettingsSidebar } from '../../../components';

export const getVisualizationComponent = (visualizationType, config, updateConfig, data) => {
  switch (visualizationType) {
    case 'BAR_CHART':
      return <BarChart config={config} data={data} />;
    case 'LINE_CHART':
      return <LineChart config={config} data={data} />;
    case 'TABLE':
      return <TableVisualization config={config} updateConfig={updateConfig} data={data} />;
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

export const getVisualizationSettings = (visualizationType, config, updateConfig) => {
  switch (visualizationType) {
    case 'BAR_CHART':
      return <BarChartSettings config={config} updateConfig={updateConfig} />;
    case 'LINE_CHART':
      return <LineChartSettings config={config} updateConfig={updateConfig} />;
    case 'TABLE':
      return <TableSettingsSidebar config={config} updateConfig={updateConfig} />;
    default:
      return null;
  }
};
