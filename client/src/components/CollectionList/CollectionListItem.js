import React from 'react';
import PropTypes from 'prop-types';
import CollectionsIcon from '@material-ui/icons/Collections';
import StarIcon from '@material-ui/icons/Star';
import { useStyles } from './styles';
import { PRIVATE_COLLECTIONS } from '../../constants';

const CollectionListItem = ({ name }) => {
  const classes = useStyles();

  return (
    <div className={classes.collectionItem}>
      {name === PRIVATE_COLLECTIONS ? <StarIcon /> : <CollectionsIcon />}
      <span>{name}</span>
    </div>
  );
};

CollectionListItem.propTypes = {
  name: PropTypes.string,
};
export default CollectionListItem;
