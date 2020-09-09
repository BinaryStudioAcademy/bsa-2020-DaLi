import React from 'react';
import PropTypes from 'prop-types';

import { Button, Tooltip } from '@material-ui/core';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import EventIcon from '@material-ui/icons/Event';
import Filter1Icon from '@material-ui/icons/Filter1';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

import useStyles from './styles';

function FilterFieldsList({ schema, chooseFilterHandler, activeFilterName }) {
  const classes = useStyles();

  const iconForType = (type) => {
    switch (type) {
      case 'number': {
        return <Filter1Icon />;
      }
      case 'string': {
        return <TextFieldsIcon />;
      }
      case 'date': {
        return <EventIcon />;
      }
      default:
        return <HelpOutlineIcon className={classes.unknownTypeTooltipIcon} />;
    }
  };

  return (
    <>
      <h3>Filter by</h3>
      {schema.map(({ data_type: type, column_name: name }, index) => {
        const disabled = type !== 'date' && type !== 'string' && type !== 'number';
        const icon = iconForType(type);
        const isActive = name === activeFilterName;

        const schemaField = (
          <Button
            key={index}
            className={isActive ? 'active' : ''}
            classes={{
              label: classes.choseFilterButtonLabel,
              root: classes.choseFilterButtonContainer,
            }}
            variant="contained"
            disabled={disabled}
            aria-hidden="true"
            startIcon={icon}
            onClick={() => chooseFilterHandler(name, type)}
          >
            {name}
          </Button>
        );

        return disabled ? (
          <Tooltip
            key={index + Date.now()}
            classes={{
              tooltip: classes.unknownTypeTooltip,
            }}
            title="You can not filter dataset by unknown type"
          >
            <div>{schemaField}</div>
          </Tooltip>
        ) : (
          schemaField
        );
      })}
    </>
  );
}

FilterFieldsList.propTypes = {
  chooseFilterHandler: PropTypes.func,
  schema: PropTypes.array,
  activeFilterName: PropTypes.string,
};

export default FilterFieldsList;
