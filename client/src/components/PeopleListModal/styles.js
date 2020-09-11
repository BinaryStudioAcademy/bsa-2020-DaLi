import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  passwordContainer: {
    border: '2px solid #f0f0f0',
    borderRadius: '8px',
    position: 'relative',
    marginTop: 20,
    padding: '16px 0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    '& > input': {
      paddingLeft: 24,
      fontSize: 30,
      letterSpacing: 4,
      outline: 'none',
      border: 'none',
      width: '100%',
    },
  },
  passwordContainerTitle: {
    position: 'absolute',
    textAlign: 'center',
    width: '100%',
    top: -10,
    '& span': {
      fontSize: 12,
      backgroundColor: '#ffffff',
      color: '#74838f',
    },
  },
  passwordIcons: {
    display: 'flex',
    alignItems: 'center',
    paddingRight: 24,
    '& button': {
      marginRight: 10,
      color: '#1cd1a1',
      border: '1px solid #ffffff',
      cursor: 'pointer',
      backgroundColor: '#ffffff',
      outline: 'none',
      fontSize: 15,
      padding: 0,
      '&:hover': {
        border: '1px solid #1cd1a1',
      },
    },
  },
  passwordIconBtn: {
    color: '#1cd1a1 !important',
    '&:hover': {
      border: '1px solid #1cd1a1 !important',
    },
  },
  passwordIcon: {
    width: 20,
    '&:hover': {
      color: '#1cd1a1',
      border: '1px solid #1cd1a1',
    },
  },
  addUserModalForm: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },

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
    display: 'flex',
    flexDirection: 'column',
    height: 'fit-content',
    position: 'relative',
    overflowY: 'auto',
    boxSizing: 'border-box',
    borderRadius: '10px',
    backgroundColor: '#FFFFFF',
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
      border: '1px solid #1cd1a1',
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

  invalid: {
    '& input,& textarea': {
      borderColor: 'red !important',
    },
  },

  buttonContainer: {
    flex: '0 0 auto',
    height: 30,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
}));
