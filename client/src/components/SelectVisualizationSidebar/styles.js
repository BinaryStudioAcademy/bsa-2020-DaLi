import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  iconStyles: {
    fontSize: '40px',
  },
  buttonStyle: {
    width: '25%',
    borderRadius: '15%',
    color: '#33A1DE',
    backgroundColor: '#D1E8F7',
    '&:hover': {
      cursor: 'pointer',
      color: '#fff',
      backgroundColor: '#33A1DE',
    },
  },
  basicContainer: {
    width: '100%',
    height: '100%',
  },
  lineContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-around',
  },
  visName: {
    position: 'absolute',
    bottom: '-30px',
    color: '#33A1DE',
  },
}));

export default useStyles;
