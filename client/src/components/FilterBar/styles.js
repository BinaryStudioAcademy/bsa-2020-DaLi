import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  chooseFilterButtonContainer: {
    width: '100%',
    borderRadius: '5px',
    margin: '5px 0',
    display: 'flex',
    justifyContent: 'start',
    '&:hover, &.active': {
      color: '#FFF',
      backgroundColor: '#1CD1A1',
    },
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
