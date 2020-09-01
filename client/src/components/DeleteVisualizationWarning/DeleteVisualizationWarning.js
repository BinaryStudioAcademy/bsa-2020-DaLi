import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const DeleteVisualizationWarning = (props) => {
  const { isVisible, onClose, deleteVisualization, visualizationId } = props;
  const onDelete = () => {
    deleteVisualization(visualizationId);
    onClose();
  };

  return (
    <Dialog
      open={isVisible}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Delete visualization</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          This visualization belongs to dashboard. Are you sure you want to delete this visualization?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onDelete} autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

DeleteVisualizationWarning.propTypes = {
  isVisible: PropTypes.bool,
  visualizationId: PropTypes.string,
  onClose: PropTypes.func,
  deleteVisualization: PropTypes.func,
};

export default DeleteVisualizationWarning;
