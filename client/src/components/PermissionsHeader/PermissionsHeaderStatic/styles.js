import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  permissionsStaticHeader: {
    height: '60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 40px',
    width: '100%',
    boxSizing: 'border-box',
    borderBottom: '1px solid #f3f4f4',
  },
  permissionsStaticButton: {
    color: 'gray',
    '&:hover': {
      color: '#2e363b',
    },
    fontSize: '26px',
    cursor: 'pointer',
    marginLeft: '20px',
  },
}));

export default useStyles;
