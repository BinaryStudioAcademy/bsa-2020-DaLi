import React from 'react';
import PropTypes from 'prop-types';
import DashboardHeaderStatic from './DashboardHeaderStatic';
import DashboardHeaderEdit from './DashboardHeaderEdit';

const DashboardHeader = (props) => {
  const { name, description, isEdit, onSetEdit, onCancelChanges, onSaveChanges, onVisualizationAdd } = props;
  const currentHeader = isEdit ? (
    <DashboardHeaderEdit
      name={name}
      description={description}
      onCancelChanges={onCancelChanges}
      onSaveChanges={onSaveChanges}
      onVisualizationAdd={onVisualizationAdd}
    />
  ) : (
    <DashboardHeaderStatic name={name} description={description} onSetEdit={onSetEdit} />
  );
  return currentHeader;
};

DashboardHeader.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  isEdit: PropTypes.bool,
  onSetEdit: PropTypes.func,
  onCancelChanges: PropTypes.func,
  onSaveChanges: PropTypes.func,
  onVisualizationAdd: PropTypes.func,
};

export default DashboardHeader;
