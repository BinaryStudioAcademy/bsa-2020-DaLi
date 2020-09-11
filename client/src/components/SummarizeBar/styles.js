import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  summarizeByButton: {
    display: 'flex',
    justifyContent: 'space-between',
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
    '&.active, &:hover': {
      color: '#FFF',
      backgroundColor: '#1CD1A1',
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
  btnWrapper: {
    margin: 'auto auto 2rem auto',
    display: 'flex',
    justifyContent: 'center',
    width: 300,
  },
}));

export default useStyles;
