import { makeStyles } from '@material-ui/core/styles';

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
    backgroundColor: '#3ca1de',
  },
  dots: {
    cursor: 'pointer',
  },
});
