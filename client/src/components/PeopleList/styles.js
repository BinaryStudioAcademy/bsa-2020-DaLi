import { makeStyles } from '@material-ui/core/styles';

export const colorStyles = makeStyles({
  admin: {
    backgroundColor: '#7073a9',
  },
  user: {
    backgroundColor: '#519ee3',
  },
});

export const useStyles = makeStyles({
  root: {
    flex: 1,
    padding: '0 4rem',
    boxSizing: 'border-box',
  },
  name: {
    display: 'flex',
    alignItems: 'center',
  },
  avatar: {
    marginRight: '20px',
  },
  dots: {
    cursor: 'pointer',
  },
});
