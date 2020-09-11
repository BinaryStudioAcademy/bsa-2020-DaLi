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
    fontSize: '1.25rem',
    fontFamily: 'Poppins, Arial, sans-serif',
    fontWeight: '500',
    lineHeight: '1.6',
    margin: 'auto',
  },

  closeIcon: {
    opacity: 0.4,
    fontSize: 18,
    '&:hover': {
      opacity: 0.8,
    },
  },

  modalContainer: {
    /* position: 'absolute',
    maxWidth: 640,
    width: '100%',
    backgroundColor: '#ffffff',
    outline: 'none',
    borderRadius: 4,
    padding: 32,
    margin: '0 auto', */
    width: 'calc(100% - 64px)',
    maxWidth: '600px',
    display: 'flex',
    maxHeight: 'calc(100 % - 64px)',
    flexDirection: 'column',
    height: 'auto',
    margin: '32px',
    padding: '20px',
    position: 'relative',
    overflowY: 'auto',
    boxSizing: 'border-box',
    borderRadius: '10px',
    backgroundColor: '#FFFFFF',
  },

  moveButton: {
    '&:disabled': {
      opacity: 0.5,
    },
  },

  addCollectionModalForm: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },

  modalInput: {
    border: 'none',
    borderBottom: '1px solid #dadada',
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
      borderBottom: '1px solid #33a1de',
    },
  },

  searchField: {
    position: 'relative',
    '& svg': {
      position: 'absolute',
      top: '8px',
      right: '10px',
    },
  },

  /* .search-field input {
    width: calc(100% - 25px);
  }

  .search-field svg {
    position: absolute;
    top: 8px;
    right: 10px;
  } */

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
    backgroundColor: '#1CD1A1',
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
