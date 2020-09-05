import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '@material-ui/core';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import EventIcon from '@material-ui/icons/Event';
import Filter1Icon from '@material-ui/icons/Filter1';

import useStyles from './styles';

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
      return null;
  }
};

function FilterFieldsList({ schema, chooseFilterHandler, activeFilterName }) {
  const classes = useStyles();

  return (
    <>
      <h3>Filter by</h3>
      {schema.map(({ data_type: type, column_name: name }, index) => {
        const disabled = type !== 'date';
        const icon = iconForType(type);
        const isActive = name === activeFilterName;

        return (
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
