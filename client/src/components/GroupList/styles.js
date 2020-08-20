import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
  root: {
    flex: 1,
    padding: '0 4rem',
    boxSizing: 'border-box',
    '& a': {
      textDecoration: 'none',
      color: '#3ca1de',
      '&:hover': {
        color: '#3c81de',
      },
    },
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
  form: {
    display: 'flex',
    justifyContent: 'space-between',
    border: '1px solid #dadada',
    padding: '10px',
    borderRadius: ' 5px',
    fontSize: '15px',
    fontFamily: 'Roboto',
    '&:focus-within': {
      border: '1px solid #33a1de',
    },
    '& input': {
      border: 'none',
      fontSize: '15px',
      fontFamily: 'Roboto',
      flexGrow: 4,
      '&::placeholder': {
        color: '#c6cfd4',
        fontSize: '15px',
        fontFamily: 'Roboto',
        fontWeight: 'bold',
      },
      '&:focus': {
        outline: 'none',
      },
    },
    '& button': {
      marginLeft: '10px',
    },
  },
  select: {
    flexGrow: 4,
  },
});
