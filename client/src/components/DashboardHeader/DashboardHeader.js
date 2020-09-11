import React from 'react';
import PropTypes from 'prop-types';
import DashboardHeaderStatic from './DashboardHeaderStatic';
import DashboardHeaderEdit from './DashboardHeaderEdit';
import DashboardHeaderFullScreen from './DashboardHeaderFullScreen';

const DashboardHeader = (props) => {
  const {
    name,
    description,
    viewDashboardMode,
    onSetEdit,
    onCancelChanges,
    onSaveChanges,
    onVisualizationAdd,
    onNameChange,
    onDescriptionChange,
    onSetFullScreenViewMode,
    onSetDefaultViewMode,
  } = props;

  const getCurrentHeader = () => {
    switch (viewDashboardMode) {
      case 'edit':
        return (
          <DashboardHeaderEdit
            name={name}
            description={description}
            onCancelChanges={onCancelChanges}
            onSaveChanges={onSaveChanges}
            onVisualizationAdd={onVisualizationAdd}
            onNameChange={onNameChange}
            onDescriptionChange={onDescriptionChange}
          />
        );
      case 'full-screen':
        return (
          <DashboardHeaderFullScreen
            name={name}
            description={description}
            onSetDefaultViewMode={onSetDefaultViewMode}
          />
        );
      default:
        return (
          <DashboardHeaderStatic
            name={name}
            description={description}
            onSetEdit={onSetEdit}
            onSetFullScreenViewMode={onSetFullScreenViewMode}
          />
        );
    }
  };

  const currentHeader = getCurrentHeader();

  return currentHeader;
};

DashboardHeader.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  viewDashboardMode: PropTypes.string,
  onSetEdit: PropTypes.func,
  onCancelChanges: PropTypes.func,
  onSaveChanges: PropTypes.func,
  onVisualizationAdd: PropTypes.func,
  onNameChange: PropTypes.func,
  onDescriptionChange: PropTypes.func,
  onSetFullScreenViewMode: PropTypes.func,
  onSetDefaultViewMode: PropTypes.func,
};

export default DashboardHeader;
