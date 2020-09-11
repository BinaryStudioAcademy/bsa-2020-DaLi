import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  permissionsTableBreadcrumbs: {
    padding: '0 50px',
    paddingTop: '30px',
  },
  permissionsTableLink: {
    color: '#8cb7e6',
    textDecoration: 'none',
  },
  permissionsTableLinkActive: {
    color: '#242424',
    cursor: 'default',
    textDecoration: 'none',
  },
  permissionsTableContainer: {
    padding: '0 40px',
    paddingBottom: '60px',
    boxSizing: 'border-box',
  },
  permissionsHeadGroupCell: {
    textAlign: 'center',
    border: 'none',
  },
  permissionsTableRow: {
    height: '150px',
    boxSizing: 'border-box',
  },
}));

export default useStyles;
