import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  summarizeByButton: {
    color: 'white',
    backgroundColor: 'rgba(136, 191, 77, 0.8)',
    textTransform: 'none',
    '&:hover': {
      backgroundColor: 'rgba(136, 191, 77, 1)',
    },
    borderRadius: '5px',
  },
  groupByButtonContainer: {
    display: 'flex',
    color: 'gray',
    textTransform: 'none',
    borderRadius: '5px',
    margin: '5px 0',
    alignSelf: 'center',
    fontSize: '18px',
    padding: '10px 0',
    '&.active': {
      color: '#FFF',
      backgroundColor: 'rgba(136, 191, 77, 0.8)',
      '& p': {
        color: '#FFF',
      },
      '& span': {
        display: 'contents',
      },
    },
    '& p': {
      margin: 0,
      flexGrow: 3,
      color: '#000',
      paddingLeft: '10px',
    },
    '& span': {
      display: 'none',
    },
    '&:hover': {
      color: '#FFF',
      backgroundColor: 'rgba(136, 191, 77, 1)',
      '& p': {
        color: '#FFF',
      },
      '& span': {
        display: 'contents',
      },
    },
  },
  groupByButton: {
    color: 'white',
    backgroundColor: 'rgba(136, 191, 77, 0.8)',
    textTransform: 'none',
    '&:hover': {
      backgroundColor: 'rgba(136, 191, 77, 1)',
    },
    borderRadius: '5px',
  },
  addMetricButton: {
    color: 'rgba(136, 191, 77, 1)',
    backgroundColor: '#f9fbfc',
    textTransform: 'none',
    '&:hover': {
      backgroundColor: '#e9fbfc',
    },
    borderRadius: '5px',
  },
}));

export default useStyles;
