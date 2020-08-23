import React from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import { FaDatabase } from 'react-icons/fa';
import AppsIcon from '@material-ui/icons/Apps';
import { Grid, Typography } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import useStyles from './styles';

const PermissionsTableDataCell = (props) => {
  const { title, id, dataType } = props;
  const classes = useStyles();
  const dataIcon =
    dataType === 'databases' ? (
      <FaDatabase className={classes.permissionsDatabaseIcon} />
    ) : (
      <AppsIcon className={classes.permissionsTableIcon} />
    );

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
