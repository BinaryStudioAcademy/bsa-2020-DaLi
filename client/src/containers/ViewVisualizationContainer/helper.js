import React from 'react';

import EqualizerOutlinedIcon from '@material-ui/icons/EqualizerOutlined';
import TimelineOutlinedIcon from '@material-ui/icons/TimelineOutlined';
import TableChartOutlinedIcon from '@material-ui/icons/TableChartOutlined';

import BarChart from '../BarChartContainer/BarChartContainer';
import LineChart from '../LineChartContainer/LineChartContainer';
import TableVisualization from '../TableVisualizationContainer/TableVisualizationContainer';

import { BarChartSettings, TableSettingsSidebar } from '../../components';
import LineChartSettings from '../LineChartSettings';

import { VISUALIZATIONS_TYPES_TO_CREATE } from './constants';

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

export const getVisualization = (visualizations, id) =>
  visualizations.filter((visualization) => visualization.id === Number(id))[0];

export const checkIsVisualizationNew = (id) => VISUALIZATIONS_TYPES_TO_CREATE.includes(id);

function createInitLineChartConfig(dataSample) {
  const keys = Object.keys(dataSample);
  if (keys.length < 2) throw Error('The table must contain at least 2 columns');
  return {
    axisData: {
      XAxis: {
        availableKeys: keys,
        key: keys[0],
        label: keys[0],
        displayLabel: true,
      },
      YAxis: {
        availableKeys: keys,
        key: keys[1],
        label: keys[1],
        displayLabel: true,
      },
    },
    display: {
      goal: {
        display: false,
        value: 0,
        label: 'our goal',
      },
      color: '#4aa1de',
      showTrendLine: false,
      showDataPointsValues: false,
      lineType: 'curveNatural',
    },
  };
}

function createInitBarChartConfig(dataSample) {
  const keys = Object.keys(dataSample);
  if (keys.length < 2) throw Error('The table must contain at least 2 columns');
  return {
    axisData: {
      XAxis: {
        availableKeys: keys,
        key: keys[0],
        label: keys[0],
        displayLabel: true,
      },
      YAxis: {
        availableKeys: keys,
        key: keys[1],
        label: keys[1],
        displayLabel: true,
      },
    },
    display: {
      goal: {
        display: false,
        value: 0,
        label: 'our goal',
      },
      color: '#4aa1de',
      showTrendLine: false,
      showDataPointsValues: false,
      lineType: '',
    },
  };
}

function createInitTableConfig(dataSample) {
  const columns = [];
  const createColumn = (id, order) => {
    return {
      id,
      title: id.charAt(0).toUpperCase() + id.substr(1),
      order,
    };
  };

  Object.keys(dataSample).forEach((key, index) => {
    columns.push(createColumn(key, index));
  });
  return {
    columns,
    sort: {
      order: 'asc',
      orderBy: 'id',
    },
  };
}

export const createNewVisualization = (visualizationType, dataSample) => {
  const newVisualization = {
    name: '',
    description: '',
    config: '',
    type: '',
  };
  switch (visualizationType) {
    case 'bar-chart':
      newVisualization.config = createInitBarChartConfig(dataSample);
      newVisualization.type = 'BAR_CHART';
      break;
    case 'line-chart':
      newVisualization.config = createInitLineChartConfig(dataSample);
      newVisualization.type = 'LINE_CHART';
      break;
    case 'table':
      newVisualization.config = createInitTableConfig(dataSample);
      newVisualization.type = 'TABLE';
      break;
    default:
      return null;
  }
  return newVisualization;
};
