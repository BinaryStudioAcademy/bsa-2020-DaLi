import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { PermissionsHeader, PermissionsTable, PermissionsModal } from '../../components';
import * as actions from './actions';
import { dbPermissions, tablePermissions } from './mock';
import { checkIsTablePermissionExist, getCurrentDatabaseTablesPermissions, getCurrentDatabaseTitle } from './helpers';
import { DATABASE_ACCESS_TYPES, TABLE_ACCESS_TYPES } from './config';

const PermissionsContainer = (props) => {
  const {
    permissions,
    getDatabasesPermissions,
    getTablesPermissions,
    updateDatabasesPermissions,
    updateTablesPermissions,
    saveChanges,
    cancelChanges,
    match,
  } = props;

  const [dataType, setDataType] = useState('databases');
  const [currentDatabaseId, setCurrentDatabaseId] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (!match.params.id) {
      const isDatabasesPermissionsExist = permissions.currentDatabasesPermissions.length;
      if (!isDatabasesPermissionsExist) {
        getDatabasesPermissions(dbPermissions);
      }
      setDataType('databases');
    } else {
      const isTablesExist = checkIsTablePermissionExist(permissions.initTablesPermissions, match.params.id);
      if (!isTablesExist) {
        getTablesPermissions(match.params.id, tablePermissions);
      }
      setCurrentDatabaseId(match.params.id);
      setDataType('tables');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [match.params.id]);

  const onDatabasesAccessChange = (databaseId, groupId, accessType) => {
    if (accessType === 'limited') {
      history.push(`/admin/permissions/${databaseId}`);
    } else {
      updateDatabasesPermissions(databaseId, groupId, accessType);
    }
  };

  const onTablesAccessChange = (tableId, groupId, accessType) => {
    updateTablesPermissions(currentDatabaseId, tableId, groupId, accessType);
  };

  const onModalOpen = () => {
    setIsModalVisible(true);
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  const onSaveChanges = () => {
    saveChanges();
    onModalClose();
  };

  const tableData =
    dataType === 'databases'
      ? permissions.currentDatabasesPermissions
      : getCurrentDatabaseTablesPermissions(currentDatabaseId, permissions.currentTablesPermissions);

  const onAccessChange = dataType === 'databases' ? onDatabasesAccessChange : onTablesAccessChange;

  const accessTypes = dataType === 'databases' ? DATABASE_ACCESS_TYPES : TABLE_ACCESS_TYPES;

  const currentDatabaseName = currentDatabaseId.length
    ? getCurrentDatabaseTitle(currentDatabaseId, permissions.currentDatabasesPermissions)
    : '';

  const isEdit = !!permissions.changes.length;

  return (
    tableData.length && (
      <>
        <PermissionsModal isVisible={isModalVisible} onClose={onModalClose} oonSaveChanges={onSaveChanges} />
        {isEdit && <PermissionsHeader onModalOpen={onModalOpen} onCancelChanges={cancelChanges} />}
        <PermissionsTable
          dataType={dataType}
          data={tableData}
          accessTypes={accessTypes}
          currentDatabaseName={currentDatabaseName}
          onAccessChange={onAccessChange}
        />
      </>
    )
  );
};

const mapStateToProps = (state) => {
  return {
    permissions: state.admin.permissions,
  };
};

const mapDispatchToProps = {
  ...actions,
};

PermissionsContainer.propTypes = {
  permissions: PropTypes.object,
  getDatabasesPermissions: PropTypes.func,
  getTablesPermissions: PropTypes.func,
  updateDatabasesPermissions: PropTypes.func,
  updateTablesPermissions: PropTypes.func,
  saveChanges: PropTypes.func,
  cancelChanges: PropTypes.func,
  match: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(PermissionsContainer);
