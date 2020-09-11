import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  iconStyles: {
    fontSize: '40px',
  },
  buttonStyle: {
    width: '25%',
    borderRadius: '4px',
    color: '#ffffff',
    backgroundColor: '#1CD1A1',
    margin: theme.spacing(0.5),
    marginBottom: '30px',
    '&:hover': {
      cursor: 'pointer',
      color: '#fff',
      backgroundColor: 'background: rgb(19, 146, 112)',
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
    color: '#4E4E4E',
  },
  invalidDataTooltip: {
    fontSize: '13px',
  },
}));

export default useStyles;
