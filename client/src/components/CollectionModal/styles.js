import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  modal: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#2e353b',
    fontSize: 14,
  },

  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },

  modalTitle: {
    display: 'inline-box',
    fontSize: 20,
    fontWeight: 500,
  },

  closeIcon: {
    opacity: 0.4,
    fontSize: 18,
    '&:hover': {
      opacity: 0.8,
    },
  },

  modalContainer: {
    position: 'absolute',
    maxWidth: 640,
    width: '100%',
    backgroundColor: '#ffffff',
    outline: 'none',
    borderRadius: 4,
    padding: 32,
    margin: '0 auto',
  },

  moveButton: {
    color: 'white',
    textTransform: 'none',
    background: '#3ca1de',
    float: 'right',
    borderRadius: '5px',
    '&:hover': {
      background: '#3ca1de',
    },
    '&:disabled': {
      opacity: 0.5,
      color: 'white',
    },
  },

  addCollectionModalForm: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    minHeight: 400,
  },

  modalInput: {
    border: '1px solid #dadada',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
    fontSize: 15,
    fontFamily: 'Roboto',
    width: '100%',
    boxSizing: 'border-box',

    '&::placeholder': {
      color: '#c6cfd4',
      fontSize: 15,
      fontFamily: 'Roboto',
      fontWeight: 'bold',
    },
    '&:focus': {
      outline: 'none',
      border: '1px solid #33a1de',
    },
  },

  labelsContainer: {
    display: 'flex',
    flexDirection: '',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 5,
    fontWeight: 'bold',
    fontSize: 12,

    '& span': {
      color: ' #718391',
    },
    '& input': {
      width: '100%',
    },
  },

  errorMessage: {
    color: 'red',
  },

  buttonContainer: {
    flex: '0 0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 20,
  },

  collectionItem: {
    display: 'flex',
    alignItems: 'center',
    fontWeight: 700,
    color: '#2e353b',
    padding: '10px 5px',
    borderRadius: 6,
    marginTop: 5,
    cursor: 'pointer',
  },

  icon: {
    color: 'rgb(199, 207, 212)',
    marginRight: 5,
  },

  active: {
    backgroundColor: '#509ee3',
    color: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    fontWeight: 700,
    padding: '10px 5px',
    borderRadius: 6,
    marginTop: 5,
    cursor: 'pointer',

    '& $icon': {
      color: '#ffffff',
    },
  },
  collectionContainer: {
    flex: 1,
  },
}));
