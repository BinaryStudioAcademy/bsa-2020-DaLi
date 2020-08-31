import React from 'react';
import PropTypes from 'prop-types';
import SettingsIcon from '@material-ui/icons/Settings';
import CloseIcon from '@material-ui/icons/Close';
import { Draggable } from 'react-beautiful-dnd';

const iconStyles = {
  color: '#c6cfd3',
};

const PropertyItem = ({ index, name, id, deleteColumn }) => {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          key={index}
          className="property-item"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <h4>{name}</h4>
          <div className="property-item_buttons-container">
            <SettingsIcon fontSize="default" style={iconStyles} />
            <CloseIcon fontSize="default" style={iconStyles} onClick={deleteColumn(id)} />
          </div>
        </div>
      )}
    </Draggable>
  );
};

PropertyItem.propTypes = {
  index: PropTypes.number,
  name: PropTypes.string,
  id: PropTypes.string,
  deleteColumn: PropTypes.func,
};

export default PropertyItem;
