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
      width: '450px',
    },
    padding: '30px',
    boxSizing: 'border-box',
  },
}));

export default useStyles;
