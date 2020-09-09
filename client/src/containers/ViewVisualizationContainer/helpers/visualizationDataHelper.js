import React from 'react';

import EqualizerOutlinedIcon from '@material-ui/icons/EqualizerOutlined';
import TimelineOutlinedIcon from '@material-ui/icons/TimelineOutlined';
import TableChartOutlinedIcon from '@material-ui/icons/TableChartOutlined';
import MapOutlinedIcon from '@material-ui/icons/MapOutlined';

import BarChart from '../../BarChartContainer/BarChartContainer';
import LineChart from '../../LineChartContainer/LineChartContainer';
import TableVisualization from '../../TableVisualizationContainer/TableVisualizationContainer';
import MapVisualization from '../../MapVisualizationContainer/MapVisualizationContainer';
import {
  BarChartSettings,
  LineChartSettings,
  TableSettingsSidebar,
  SelectVisualizationSidebar,
  MapSettingsSidebar,
} from '../../../components';

export const getVisualizationComponent = (visualizationType, config, updateConfig, data) => {
  if (data?.length) {
    switch (visualizationType) {
      case 'BAR_CHART':
        return <BarChart config={config} data={data} />;
      case 'LINE_CHART':
        return <LineChart config={config} data={data} />;
      case 'TABLE':
        return <TableVisualization config={config} updateConfig={updateConfig} data={data} />;
      case 'MAP':
        return <MapVisualization config={config} updateConfig={updateConfig} data={data} />;
      default:
        return null;
    }
  } else {
    return 'There is no data to show';
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
    case 'MAP':
      return <MapOutlinedIcon />;
    default:
      return null;
  }
};

export const getVisualizationSettings = (visualizationType, config, updateConfig, userNotificationError) => {
  switch (visualizationType) {
    case 'BAR_CHART':
      return <BarChartSettings config={config} updateConfig={updateConfig} />;
    case 'LINE_CHART':
      return <LineChartSettings config={config} updateConfig={updateConfig} />;
    case 'TABLE':
      return (
        <TableSettingsSidebar
          config={config}
          updateConfig={updateConfig}
          userNotificationError={userNotificationError}
        />
      );
    case 'MAP':
      return <MapSettingsSidebar config={config} updateConfig={updateConfig} />;
    default:
      return null;
  }
};

export const getSelectVisualizationSidebar = (tableId, schema) => {
  return <SelectVisualizationSidebar tableId={tableId} schema={schema} />;
};
