import React from 'react';
import PropTypes from 'prop-types';
import CollectionsIcon from '@material-ui/icons/Collections';
import StarIcon from '@material-ui/icons/Star';
import { Button } from '@material-ui/core';
import { useStyles } from './styles';
import { PRIVATE_COLLECTIONS } from '../../constants';

const CollectionListItem = ({ name, id }) => {
  const classes = useStyles();
  const icon = name === PRIVATE_COLLECTIONS ? <StarIcon /> : <CollectionsIcon />;
  return (
    <Button
      key={id}
      classes={{
        root: classes.collectionItem,
      }}
      variant="contained"
      aria-hidden="true"
      startIcon={icon}
    >
      {name}
    </Button>
  );
};

CollectionListItem.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
};
export default CollectionListItem;
