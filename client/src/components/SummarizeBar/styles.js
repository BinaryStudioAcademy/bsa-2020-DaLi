import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  summarizeByButton: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  groupByButtonContainer: {
    width: '100%',
    display: 'flex',
    cursor: 'pointer',
    borderRadius: '5px',
    margin: '5px 0',
    '&.active, &:hover': {
      color: '#FFF',
      backgroundColor: '#1CD1A1',
      '& p': {
        color: '#FFF',
      },
      '& .date-period-btn': {
        display: 'contents',
      },
    },
    '& p': {
      flexGrow: 3,
      '& *': {
        marginRight: 5,
      },
    },
    '& .date-period-btn': {
      display: 'none',
      cursor: 'pointer',
      marginRight: 10,
    },
  },
  btnWrapper: {
    margin: 'auto auto 2rem auto',
    display: 'flex',
    justifyContent: 'center',
    width: 300,
  },
}));

export default useStyles;
