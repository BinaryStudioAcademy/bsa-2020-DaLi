import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  dashboardEditingHeader: {
    display: 'flex',
    flexDirection: 'row',
    borderBottom: '1px solid #f3f4f4',
  },

  dashboardEditingHeaderTop: {
    flexDirection: 'row',
    height: '50px',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: '#1CD1A1',
    padding: '0 40px',
    width: '100%',
    boxSizing: 'border-box',
  },

  dashboardEditingHeaderTitle: {
    fontWeight: 'bold',
    fontSize: '15px',
    color: '#f4fefe',
  },

  dashboardEditingHeaderButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  dashboardEditingHeaderButton: {
    padding: '0px 15px',
    fontSize: '14px',
    boxSizing: 'border-box',
    height: '35px',
    textTransform: 'none',
    marginLeft: '20px',
  },

  dashboardEditingHeaderButtonCancel: {
    color: '#faf7fa',
    background: '#1CD1A1',
  },

  dashboardEditingHeaderButtonSave: {
    color: '#faf7fa',
    background: '#5dc194',
  },

  dashboardEditingHeaderBottom: {
    flexDirection: 'row',
    height: 100,
    alignItems: 'center',
    justifyContent: 'space-between',
    background: '#fffff',
    padding: '0 40px',
    width: '100%',
    boxSizing: 'border-box',
  },
  dashboardEditingHeaderInputs: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '250px',
    height: 50,
    justifyContent: 'space-between',
  },

  dashboardEditingHeaderInput: {
    '&:hover': {
      borderColor: '#1CD1A1',
    },
    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      borderColor: '#eeeee',
    },
    '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      borderColor: '#1CD1A1',
      opacity: '.8',
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#1CD1A1',
    },
    marginRight: 15,
  },
  dashboardEditingHeaderHelperText: {
    position: 'absolute',
    left: '0',
    top: '-20px',
  },
  dashboardAddVisualisationBtn: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
}));

export default useStyles;
