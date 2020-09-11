import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  permissionsEditingHeader: {
    borderTop: '1px solid #FFF',
    display: 'flex',
    height: '60px',
    alignItems: 'center',
    borderBottom: '1px solid #f3f4f4',
    backgroundColor: '#1CD1A1',
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
    background: '#1CD1A1',
  },

  permissionsEditingHeaderButtonSave: {
    color: '#faf7fa',
    background: '#5dc194',
  },
}));

export default useStyles;
