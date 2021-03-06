import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  root: {
    flex: 1,
    padding: '0 4rem',
    boxSizing: 'border-box',
  },
  tableRow: {
    transition: '0.3s',
    '&:hover': {
      backgroundColor: '#4785bb0f',
      '& $deleteButton': {
        opacity: 1,
      },
    },
  },
  databaseName: {
    textDecoration: 'none',
    color: '#509ee3',
    fontWeight: 700,
    width: '40%',
  },
  deleteButton: {
    opacity: 0,
    backgroundColor: '#ed6e6e',
    borderColor: '#ed6e6e',
    color: '#ffffff',
    transition: '0.3s',
    '&:hover': {
      backgroundColor: '#ed6e6e',
    },
  },
  item: {
    textDecoration: 'none',
    color: '#1CD1A1',
  },
}));
