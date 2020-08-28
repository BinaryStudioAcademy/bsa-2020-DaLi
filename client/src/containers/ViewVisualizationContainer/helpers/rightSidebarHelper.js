import React from 'react';
import { FILTER, SUMMARIZE } from '../componentTypes';
import SummarizeBar from '../../../components/SummarizeBar/SummarizeBar';
import FilterBar from '../../../components/FilterBar/FilterBar';

export const getRightSidebarComponent = (type) => {
  switch (type) {
    case FILTER:
      return <FilterBar />;
    case SUMMARIZE:
      return <SummarizeBar />;
    default:
      return null;
  }
};
