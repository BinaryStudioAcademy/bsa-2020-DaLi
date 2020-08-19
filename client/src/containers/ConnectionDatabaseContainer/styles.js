import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  content: {
    backgroundColor: '#f9fbfc',
    borderTop: '1px solid #eee',
  },
  wrapper: {
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '500px',
    },
    padding: '30px',
    boxSizing: 'border-box',
  },
  label: {
    color: 'grey',
    fontSize: '14px',
    fontWeight: '900',
    display: 'block',
    marginBottom: '5px',
  },
  field: {
    width: '100%',
    fontWeight: '600',
    color: '#333333f5',
  },
  save: {
    backgroundColor: '#5BA4CF',
    color: '#fff',
    border: 'none',
  },
  error: {
    position: 'absolute',
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: 'red',
    bottom: '2.5rem',
    left: '110%',
    width: '600px',
  },
  relative: {
    position: 'relative',
  },
  nativeSelect: {
    borderRadius: '5px',
    border: '2px #dcdcdc solid',
    padding: '0px 10px',
    color: '#808080a1',
    fontWeight: '500',
    marginBottom: '20px',
    '&:before': {
      borderColor: '#dcdcdc',
    },
    '&:after': {
      borderColor: '#dcdcdc',
    },
    '&.Mui-focused select': {
      backgroundColor: 'inherit',
    },
  },
  titleName: {
    fontWeight: '500',
    fontSize: '20px',
    margin: '20px 0 10px',
  },
  titleSection: {
    color: '#C8CED2',
  },
  emptySpace: {
    margin: '0px 20px',
  },
}));

export default useStyles;
