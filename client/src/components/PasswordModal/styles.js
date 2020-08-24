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

    '& span': {
      marginRight: 10,
      color: '#509ee3',
      border: '1px solid #ffffff',
      cursor: 'pointer',
      '&:hover': {
        borderBottom: '1px solid #509ee3',
      },
    },
  },
  passwordIcon: {
    width: 20,
    '&:hover': {
      color: '#509ee3',
    },
  },

  doneButton: {
    color: 'white',
    textTransform: 'none',
    background: '#3ca1de',
    marginTop: 20,
    float: 'right',
    borderRadius: '5px',
    padding: 10,
    '&:hover': {
      background: '#3ca1de',
    },
  },
  resetButton: {
    color: 'white',
    textTransform: 'none',
    background: '#ed6e6e',
    marginTop: 20,
    float: 'right',
    borderRadius: '5px',
    padding: 10,
    '&:hover': {
      background: '#ed6e6e',
    },
  },
}));
