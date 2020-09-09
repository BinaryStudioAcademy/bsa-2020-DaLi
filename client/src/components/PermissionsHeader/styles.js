import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  permissionsEditingHeader: {
    display: 'flex',
    height: '60px',
    alignItems: 'center',
    borderBottom: '1px solid #f3f4f4',
    backgroundColor: '#8588b6',
    padding: '0 40px',
    boxSizing: 'border-box',
    justifyContent: 'space-between',
  },
  permissionsEditingHeaderTitle: {
    fontSize: '15px',
    color: '#f6f6f9',
  },

  permissionsEditingHeaderButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  permissionsEditingHeaderButton: {
    padding: '0px 15px',
    fontSize: '14px',
    boxSizing: 'border-box',
    height: '35px',
    textTransform: 'none',
    marginLeft: '20px',
  },

  permissionsEditingHeaderButtonCancel: {
    color: '#faf7fa',
    background: '#9294bd',
  },

  permissionsEditingHeaderButtonSave: {
    color: '#4e4f50',
    background: '#ffffff',
    '&:hover': {
      background: '#eee',
    },
  },
}));

export default useStyles;
