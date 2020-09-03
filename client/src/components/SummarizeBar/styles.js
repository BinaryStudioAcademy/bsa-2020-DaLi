import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  summarizeByButton: {
    color: 'white',
    backgroundColor: 'rgba(136, 191, 77, 0.8)',
    textTransform: 'none',
    justifyContent: 'space-between',
    '&:hover': {
      backgroundColor: 'rgba(136, 191, 77, 1)',
    },
    '& svg:hover': {
      color: 'gray',
    },
    borderRadius: '5px',
  },
  groupByButtonContainer: {
    display: 'flex',
    color: 'gray',
    cursor: 'pointer',
    textTransform: 'none',
    borderRadius: '5px',
    margin: '5px 0',
    alignSelf: 'center',
    fontSize: '18px',
    padding: '10px 18px 10px 5px',
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
      cursor: 'pointer',
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
    '& svg:hover': {
      color: 'gray',
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
  summarizeDoneButton: {
    marginTop: '30px',
    color: 'white',
    alignSelf: 'center',
    backgroundColor: 'rgba(136, 191, 77, 0.8)',
    textTransform: 'none',
    '&:hover': {
      backgroundColor: 'rgba(136, 191, 77, 1)',
    },
    '& span': {
      padding: '5px 20px',
    },
    borderRadius: '5px',
  },
}));

export default useStyles;
