import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  iconStyles: {
    fontSize: '40px',
  },
  buttonStyle: {
    width: '25%',
    borderRadius: '15%',
    color: '#33A1DE',
    backgroundColor: '#D1E8F7',
    margin: theme.spacing(0.5),
    marginBottom: '30px',
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
  invalidDataTooltip: {
    fontSize: '13px',
  },
}));

export default useStyles;
