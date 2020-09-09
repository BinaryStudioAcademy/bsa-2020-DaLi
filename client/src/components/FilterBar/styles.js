import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  choseFilterButtonContainer: {
    width: '100%',
    borderRadius: '5px',
    margin: '5px 0',
    '&:hover': {
      color: '#FFF',
      backgroundColor: '#7172AD',
    },
    '& svg:hover': {
      color: 'gray',
    },
    '&.active': {
      color: '#FFF',
      backgroundColor: '#7172AD',
    },
  },

  choseFilterButtonLabel: {
    color: '#000',
  },

  btn: {
    backgroundColor: '#7172AD',
    color: 'white',
    borderRadius: '2rem',
    padding: '1rem 4rem',
  },

  btnWrapper: {
    margin: 'auto auto 2rem auto',
    display: 'flex',
    justifyContent: 'center',
    width: 300,
  },

  unknownTypeTooltip: {
    fontSize: '13px',
  },

  unknownTypeTooltipIcon: {
    color: 'gray',
    '&:hover': {
      color: '#2e363b',
    },
    cursor: 'pointer',
  },
}));

export default useStyles;
