import React from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import { FaDatabase } from 'react-icons/fa';
import AppsIcon from '@material-ui/icons/Apps';
import CollectionsIcon from '@material-ui/icons/Collections';
import { Grid, Typography } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import useStyles from './styles';

const PermissionsTableDataCell = (props) => {
  const { title, id, dataType } = props;
  const classes = useStyles();
  let dataIcon;

  switch (dataType) {
    case 'tables':
      dataIcon = <AppsIcon className={classes.permissionsTableIcon} />;
      break;
    case 'collections':
      dataIcon = <CollectionsIcon className={classes.permissionsTableIcon} />;
      break;
    default:
      dataIcon = <FaDatabase className={classes.permissionsDatabaseIcon} />;
      break;
  }

  return (
    <TableCell classes={{ root: classes.permissionsTableDataCell }}>
      <Grid className={classes.permissionsDataItem} container>
        {dataIcon}
        <Grid className={classes.permissionsDataItemContent}>
          <Typography className={classes.permissionsDataItemTitle}> {title}</Typography>
          {dataType === 'databases' && (
            <NavLink
              className={classes.permissionsDataItemLink}
              to={{
                pathname: `/admin/permissions/${id}`,
              }}
              key={id}
            >
              View Tables
            </NavLink>
          )}
        </Grid>
      </Grid>
    </TableCell>
  );
};

PermissionsTableDataCell.propTypes = {
  title: PropTypes.string,
  id: PropTypes.string,
  dataType: PropTypes.string,
};

export default PermissionsTableDataCell;
