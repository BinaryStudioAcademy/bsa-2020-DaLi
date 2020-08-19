import React from 'react';
import PropTypes from 'prop-types';
import PermissionsHeaderEdit from './PermissionsHeaderEdit';
import PermissionsHeaderStatic from './PermissionsHeaderStatic';

const PermissionsHeader = (props) => {
  const { isEdit, onSetEdit, onCancelChanges, onSaveChanges } = props;
  const currentHeader = isEdit ? (
    <PermissionsHeaderEdit onCancelChanges={onCancelChanges} onSaveChanges={onSaveChanges} />
  ) : (
    <PermissionsHeaderStatic onSetEdit={onSetEdit} />
  );
  return currentHeader;
};

PermissionsHeader.propTypes = {
  isEdit: PropTypes.bool,
  onSetEdit: PropTypes.func,
  onCancelChanges: PropTypes.func,
  onSaveChanges: PropTypes.func,
};

export default PermissionsHeader;
