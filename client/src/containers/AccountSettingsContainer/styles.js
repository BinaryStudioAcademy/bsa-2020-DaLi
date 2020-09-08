import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  accountSettingsContainer: {
    minHeight: '100vh',
    width: '100%',
  },

  accountSettingsHeader: {
    height: '300px',
    backgroundColor: '#fff',
  },
  accountSettingsAvatar: {
    marginTop: '70px',
    width: '60px',
    height: '60px',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: '15px',
    backgroundColor: '#3ca1de',
  },
  accountSettingsTitle: {
    marginTop: '20px',
    fontSize: '22px',
    fontWeight: '600',
  },
  accountSettingsTabs: {
    marginTop: 'auto',
  },
  accountSettingsTab: {
    textTransform: 'none',
    color: '#000',
    minWidth: '10px',
    flexGrow: 1,
    padding: '15px 0',
    margin: '0 15px',
    fontWeight: 'bold',
    opacity: 1,
    fontSize: '15px',
    '&:hover': {
      color: '#3ca1de',
      opacity: 1,
    },
    '&:focus': {
      color: '#3ca1de',
    },
  },
  accountSettingsTabSelected: {
    color: '#3ca1de',
  },
  accountSettingsTabsIndicator: {
    height: '3px',
    backgroundColor: '#3ca1de',
  },
  accountSettingsContent: {
    backgroundColor: '#f9fbfc',
    borderTop: '1px solid #eee',
  },
  accountSettingsTabPanel: {
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '600px',
    },
    padding: '30px',
    boxSizing: 'border-box',
  },
  label: {
    color: 'grey',
    fontSize: '14px',
    fontWeight: '900',
    display: 'block',
    marginBottom: '5px',
    padding: '0 2px',
  },
  field: {
    position: 'relative',
    width: '100%',
    fontWeight: '600',
    color: '#333333f5',
    marginBottom: 0,
  },
  update: {
    backgroundColor: '#5BA4CF',
    color: '#fff',
    border: 'none',
    marginTop: 10,
    '&:hover:enabled': {
      cursor: 'pointer',
    },
  },
  save: {
    marginTop: 10,
    backgroundColor: '#5BA4CF',
    color: '#fff',
    border: 'none',
    borderRadius: 5,
    outline: 'none',
    '&:hover:enabled': {
      cursor: 'pointer',
    },
    '&:disabled': {
      color: '#999',
      border: '2px solid #dcdcdc',
      backgroundColor: 'inherit',
    },
  },
  error: {
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: 'red',
    bottom: '2.5rem',
    fontSize: '0.75rem',
    padding: '2px 5px',
  },
  relative: {
    position: 'relative',
    padding: '15px 0',
    height: '75px',
  },
}));

export default useStyles;
