import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import MuiDialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  deleteButton: {
    color: 'white',
    textTransform: 'none',
    background: 'red',
    '&:hover': {
      background: 'red',
    },
    borderRadius: '5px',
    marginRight: '20px',
  }
})

const DeleteDatabaseModal = ({ isVisible, closeModal }) => {
  const classes = useStyles();

  const cancel = () => {
    closeModal();
  };

  return (
    <Dialog open={isVisible || false} maxWidth="sm" fullWidth>
      <DialogTitle>Delete this database</DialogTitle>
      <DialogContent>
        <DialogContentText>
          If you're sure, please type <strong>DELETE</strong> in this box:
        </DialogContentText>
      </DialogContent>
      <MuiDialogActions className="visualizationModalFooter">
        <Button onClick={cancel} variant="outlined" style={{ textTransform: 'none', fontSize: 12 }}>
          Cancel
        </Button>
        <Button
        className={classes.deleteButton}
          type="submit"
          variant="contained"
          style={{ textTransform: 'none', fontSize: 12 }}
        >
          Delete
        </Button>
      </MuiDialogActions>
    </Dialog>
  );
};

export default DeleteDatabaseModal;
