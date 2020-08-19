import React, { useState } from 'react';
import { PermissionsHeader } from '../../components';

const PermissionsContainer = () => {
  const [isEdit, setIsEdit] = useState(false);
  const onSetEdit = () => {
    setIsEdit(true);
  };

  const onSaveChanges = () => {
    setIsEdit(false);
  };

  const onCancelChanges = () => {
    setIsEdit(false);
  };

  return (
    <PermissionsHeader
      isEdit={isEdit}
      onSetEdit={onSetEdit}
      onSaveChanges={onSaveChanges}
      onCancelChanges={onCancelChanges}
    />
  );
};

export default PermissionsContainer;
