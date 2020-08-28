import React from 'react';
import { FILTER, SUMMARIZE } from '../componentTypes';
import SummarizeBar from '../../../components/SummarizeBar/SummarizeBar';
import FilterBar from '../../../components/FilterBar/FilterBar';

export const getRightSidebarComponent = (type, currentVisualization) => {
  switch (type) {
    case FILTER:
      return <FilterBar currentVisualization={currentVisualization} />;
    case SUMMARIZE:
      return <SummarizeBar currentVisualization={currentVisualization} />;
    default:
      return null;
  }
};
