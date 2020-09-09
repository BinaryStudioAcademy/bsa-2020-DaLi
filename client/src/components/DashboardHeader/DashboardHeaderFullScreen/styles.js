import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  dashboardFullScreenHeader: {
    height: '80px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 40px',
    width: '100%',
    boxSizing: 'border-box',
    background: '#f9fbfc',
    position: 'absolute',
    top: 0,
  },

  dashboardFullScreenTitle: {
    flexDirection: 'row',
    height: '42px',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  dashboardFullScreenName: {
    fontWeight: '500',
    fontSize: '25px',
  },

  dashboardFullScreenDescription: {
    fontSize: '13px',
  },

  dashboardFullScreenDescriptionIcon: {
    color: 'gray',
    '&:hover': {
      color: '#2e363b',
    },
    fontSize: '20px',
    cursor: 'pointer',
    marginLeft: '20px',
  },

  dashboardFullScreenButton: {
    color: 'gray',
    '&:hover': {
      color: '#2e363b',
    },
    fontSize: '30px',
    cursor: 'pointer',
  },
}));

export default useStyles;
