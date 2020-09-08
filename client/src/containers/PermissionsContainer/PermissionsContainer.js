import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import { PermissionsHeader, PermissionsTable, PermissionsModal } from '../../components';
import * as actions from './actions';
import { checkIsTablePermissionExist, getCurrentDatabaseTablesPermissions, getCurrentDatabaseTitle } from './helpers';
import { DEFAULT_ACCESS_TYPES, TABLE_ACCESS_TYPES } from './config';
import { useStyles } from './styles';
import { DEFAULT_COLLECTIONS, PRIVATE_COLLECTIONS } from '../../constants';

const PermissionsContainer = (props) => {
  const {
    permissions,
    getDatabasesPermissions,
    getCollectionsPermissions,
    updateCollectionsPermissions,
    getTablesPermissions,
    updateDatabasesPermissions,
    updateTablesPermissions,
    saveChanges,
    saveCollectionChanges,
    cancelChanges,
    match,
    resetState,
  } = props;

  const classes = useStyles();
  const [dataType, setDataType] = useState('databases');
  const [currentDatabaseId, setCurrentDatabaseId] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [value, setValue] = useState(0);

  const history = useHistory();

  useEffect(() => {
    return () => {
      resetState();
    };
  }, [resetState]);

  useEffect(() => {
    if (!match.params.id) {
      const isDatabasesPermissionsExist = permissions.currentDatabasesPermissions.length;
      const isCollectionsPermissionsExist = permissions.currentCollectionsPermissions.length;

      if (!isDatabasesPermissionsExist && value === 0) {
        getDatabasesPermissions();
      }
      if (!isCollectionsPermissionsExist && value === 1) {
        getCollectionsPermissions();
      }

      if (!value) {
        setDataType('databases');
      } else {
        setDataType('collections');
      }
    } else {
      const isTablesExist = checkIsTablePermissionExist(permissions.initTablesPermissions, match.params.id);
      if (!isTablesExist) {
        getTablesPermissions(match.params.id);
      }
      setCurrentDatabaseId(match.params.id);
      setDataType('tables');
    }
  }, [
    value,
    match.params.id,
    getDatabasesPermissions,
    getCollectionsPermissions,
    getTablesPermissions,
    permissions.currentDatabasesPermissions.length,
    permissions.currentCollectionsPermissions.length,
    permissions.initTablesPermissions,
  ]);

  const onDatabasesAccessChange = (databaseId, groupId, accessType) => {
    if (accessType === 'limited') {
      history.push(`/admin/permissions/${databaseId}`);
    } else {
      updateDatabasesPermissions(databaseId, groupId, accessType);
    }
  };

  const onCollectionsAccessChange = (collectionId, groupId, accessType) => {
    updateCollectionsPermissions(collectionId, groupId, accessType);
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
    if (dataType === 'collections') {
      saveCollectionChanges(permissions.changes);
    } else {
      saveChanges(permissions.changes);
    }
    onModalClose();
  };

  let tableData;
  let accessTypes;
  let onAccessChange;

  switch (dataType) {
    case 'tables':
      tableData = getCurrentDatabaseTablesPermissions(currentDatabaseId, permissions.currentTablesPermissions);
      onAccessChange = onTablesAccessChange;
      accessTypes = TABLE_ACCESS_TYPES;
      break;
    case 'collections':
      tableData = permissions.currentCollectionsPermissions.filter(
        (collection) => collection.name !== DEFAULT_COLLECTIONS && collection.name !== PRIVATE_COLLECTIONS
      );
      onAccessChange = onCollectionsAccessChange;
      accessTypes = DEFAULT_ACCESS_TYPES;
      break;
    default:
      tableData = permissions.currentDatabasesPermissions;
      onAccessChange = onDatabasesAccessChange;
      accessTypes = DEFAULT_ACCESS_TYPES;
      break;
  }

  const currentDatabaseName = currentDatabaseId.length
    ? getCurrentDatabaseTitle(currentDatabaseId, permissions.currentDatabasesPermissions)
    : '';

  const isEdit = !!permissions.changes.length;
  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue !== value) {
      cancelChanges();
    }
    history.push('/admin/permissions/');
  };

  return (
    <>
      {isEdit && <PermissionsHeader onModalOpen={onModalOpen} onCancelChanges={cancelChanges} />}
      <div className={classes.tabsHeader}>
        <Tabs
          className={classes.tabsContainer}
          value={value}
          onChange={handleChange}
          classes={{ indicator: classes.indicator }}
        >
          <Tab classes={{ root: classes.tabsButtons, selected: classes.selected }} label="Database permissions" />
          <Tab classes={{ root: classes.tabsButtons, selected: classes.selected }} label="Collection permissions" />
        </Tabs>
      </div>
      {!!tableData?.length && (
        <>
          <PermissionsModal isVisible={isModalVisible} onClose={onModalClose} onSaveChanges={onSaveChanges} />
          <Box hidden={value !== 0}>
            <PermissionsTable
              dataType={dataType}
              data={tableData}
              accessTypes={accessTypes}
              currentDatabaseName={currentDatabaseName}
              onAccessChange={onAccessChange}
            />
          </Box>
          <Box hidden={value !== 1}>
            <PermissionsTable
              dataType={dataType}
              data={tableData}
              accessTypes={accessTypes}
              currentDatabaseName={currentDatabaseName}
              onAccessChange={onAccessChange}
            />
          </Box>
        </>
      )}
    </>
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
  resetState: PropTypes.func,
  getCollectionsPermissions: PropTypes.func,
  updateCollectionsPermissions: PropTypes.func,
  saveCollectionChanges: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(PermissionsContainer);
