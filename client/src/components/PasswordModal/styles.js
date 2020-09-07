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
      color: '#509ee3',
      border: '1px solid #ffffff',
      cursor: 'pointer',
      backgroundColor: '#ffffff',
      outline: 'none',
      fontSize: 15,
      padding: 0,
      '&:hover': {
        borderBottom: '1px solid #509ee3',
      },
    },
  },
  passwordIconBtn: {
    color: '#1cd1a1 !important',
    '&:hover': {
      borderBottom: '1px solid #1cd1a1 !important',
    },
  },
  passwordIcon: {
    width: 20,
    '&:hover': {
      color: '#509ee3',
      borderBottom: '1px solid #1cd1a1',
    },
  },
}));
