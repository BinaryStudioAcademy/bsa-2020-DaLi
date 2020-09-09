import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { ImCheckmark, ImCross, ImRadioChecked } from 'react-icons/im';

import useStyles from './styles';

const PermissionsTableAccessCell = (props) => {
  const { access, groupId, itemId, onAccessChange, groupName, accessTypes } = props;
  const classes = useStyles();
  const [isControlsVisible, setIsControlsVisible] = useState(false);

  useEffect(() => {
    setIsControlsVisible(false);
  }, [itemId, access]);

  const isAdminGroup = groupName === 'Administrators';

  const getCellClassName = (access) => {
    if (isAdminGroup) {
      return `${classes.permissionsTableAccessCell} ${classes.permissionsTableAccessCellAdmin}`;
    }
    switch (access) {
      case 'granted':
        return `${classes.permissionsTableAccessCell} ${classes.permissionsTableAccessCellGranted}`;
      case 'limited':
        return `${classes.permissionsTableAccessCell} ${classes.permissionsTableAccessCellLimited}`;
      default:
        return `${classes.permissionsTableAccessCell} ${classes.permissionsTableAccessCellDenied}`;
    }
  };

  const getCellControlsIconClassName = (access) => {
    switch (access) {
      case 'granted':
        return `${classes.permissionsAccessControlsIcon} ${classes.permissionsAccessControlsIconGranted}`;
      case 'limited':
        return `${classes.permissionsAccessControlsIcon} ${classes.permissionsAccessControlsIconLimited}`;
      default:
        return `${classes.permissionsAccessControlsIcon} ${classes.permissionsAccessControlsIconDenied}`;
    }
  };

  const getAccessIcon = (access) => {
    switch (access) {
      case 'granted':
        return <ImCheckmark />;
      case 'limited':
        return <ImRadioChecked />;
      default:
        return <ImCross />;
    }
  };

  const cellClassName = getCellClassName(access);
  const cellIcon = getAccessIcon(access);

  const cellControlsClassName = isControlsVisible
    ? `${classes.permissionsTableAccessCellControls} ${classes.permissionsTableAccessCellControlsVisible}`
    : classes.permissionsTableAccessCellControls;

  const handleChange = (event) => {
    const access = event.target.value;
    onAccessChange(itemId, groupId, access);
  };

  const tableCellControls = (
    <FormControl className={cellControlsClassName} component="fieldset">
      <RadioGroup aria-label="access" value={access} onChange={handleChange}>
        {accessTypes.map((accessType) => {
          if (accessType.type === access) {
            return null;
          }
          const icon = getAccessIcon(accessType.type);
          const iconClassName = getCellControlsIconClassName(accessType.type);
          return (
            <FormControlLabel
              key={`${itemId} - ${accessType.title}`}
              className={classes.permissionsTableAccessCellControlsLabel}
              label={<span className={classes.permissionsTableAccessCellControlsLabelTitle}>{accessType.title}</span>}
              value={accessType.type}
              control={<Radio disableRipple icon={icon} className={iconClassName} />}
            />
          );
        })}
      </RadioGroup>
    </FormControl>
  );

  return (
    <TableCell
      onClick={() => setIsControlsVisible(true)}
      onMouseLeave={() => setIsControlsVisible(false)}
      className={cellClassName}
    >
      {cellIcon}
      {isAdminGroup ? null : tableCellControls}
    </TableCell>
  );
};

PermissionsTableAccessCell.propTypes = {
  access: PropTypes.string,
  itemId: PropTypes.string,
  groupId: PropTypes.string,
  onAccessChange: PropTypes.func,
  groupName: PropTypes.string,
  accessTypes: PropTypes.array,
};

export default PermissionsTableAccessCell;
