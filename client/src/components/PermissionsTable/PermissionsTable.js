import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import PermissionTableDataCell from './PermissionTableDataCell';
import PermissionTableAccessCell from './PermissionTableAccessCell';
import useStyles from './styles';

const PermissionsTable = (props) => {
  const { data, onAccessChange, dataType, currentDatabaseName, accessTypes } = props;
  const classes = useStyles();

  const userGroups = data[0].groups;
  let dataNameProperty;
  let dataIdProperty;
  let linkClassName;

  switch (dataType) {
    case 'tables':
      dataNameProperty = 'tableName';
      dataIdProperty = 'tableId';
      linkClassName = classes.permissionsTableLink;
      break;
    case 'collections':
      dataNameProperty = 'name';
      dataIdProperty = 'id';
      linkClassName = classes.permissionsTableLinkActive;
      break;
    default:
      dataNameProperty = 'dbNickname';
      dataIdProperty = 'databaseId';
      linkClassName = classes.permissionsTableLinkActive;
      break;
  }

  return (
    <>
      <Breadcrumbs className={classes.permissionsTableBreadcrumbs} aria-label="breadcrumb">
        <NavLink className={linkClassName} to="/admin/permissions">
          Permissions
        </NavLink>
        {dataType === 'tables' && <Typography color="textPrimary">{currentDatabaseName}</Typography>}
      </Breadcrumbs>
      <Grid className={classes.permissionsTableContainer} container>
        <Table style={{ width: '100%', tableLayout: 'fixed' }} aria-label="permissions table">
          <TableHead>
            <TableRow>
              <TableCell classes={{ root: classes.permissionsHeadGroupCell }} />
              {userGroups.map((group) => (
                <TableCell key={group.groupName} classes={{ root: classes.permissionsHeadGroupCell }}>
                  {group.groupName}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((permission) => (
              <TableRow key={permission[dataIdProperty]} className={classes.permissionsTableRow}>
                <PermissionTableDataCell
                  key={permission[dataNameProperty]}
                  title={permission[dataNameProperty]}
                  id={permission[dataIdProperty]}
                  dataType={dataType}
                />
                {permission.groups.map((userGroup) => (
                  <PermissionTableAccessCell
                    key={`${permission[dataIdProperty]} - ${userGroup.groupId}`}
                    access={userGroup.access}
                    itemId={permission[dataIdProperty]}
                    groupId={userGroup.groupId}
                    groupName={userGroup.groupName}
                    onAccessChange={onAccessChange}
                    dataType={dataType}
                    accessTypes={accessTypes}
                  />
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Grid>
    </>
  );
};

PermissionsTable.propTypes = {
  data: PropTypes.array,
  onAccessChange: PropTypes.func,
  dataType: PropTypes.string,
  currentDatabaseName: PropTypes.string,
  accessTypes: PropTypes.array,
};

export default PermissionsTable;
