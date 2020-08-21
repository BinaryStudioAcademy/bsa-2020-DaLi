import React from 'react';
import PropTypes from 'prop-types';
import { SelectVisualization } from '../../components';

const SelectVisualizationPage = ({
  location: {
    state: { tableId },
  },
}) => {
  return <SelectVisualization tableId={tableId} />;
};

SelectVisualizationPage.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      tableId: PropTypes.string,
    }),
  }),
};

export default SelectVisualizationPage;
