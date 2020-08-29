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
