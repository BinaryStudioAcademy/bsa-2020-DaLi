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
  tableContainer: {
    minHeight: '350px',
  },
  name: {
    display: 'flex',
    alignItems: 'center',
  },
  groupLink: {
    color: '#1cd1a1 !important',
    '&:hover': {
      textDecoration: 'underline !important',
    },
  },
  avatar: {
    marginRight: '20px',
    backgroundColor: '#1cd1a1',
  },
  dots: {
    cursor: 'pointer',
  },
  form: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px',
    borderRadius: ' 5px',
    fontSize: '15px',
    fontFamily: 'Roboto',
    '& .MuiFormControl-root': {
      width: '75%',
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
  customError: {
    color: 'red',
    position: 'absolute',
    fontSize: '14px',
    top: '-1em',
  },
});
