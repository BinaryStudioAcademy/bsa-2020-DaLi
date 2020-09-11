import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    height: 'calc(100vh - 83px)',
  },
  menu: {
    width: '200px',
    backgroundColor: '#fafafa',
    boxShadow: 'inset -1px -1px 3px rgba(0, 0, 0, .13)',
  },
  menulist: {
    position: 'sticky',
    top: '83px',
  },
  menuItem: {
    padding: '0',
    borderRadius: '4px',
    marginBottom: '0.25em',
  },
  link: {
    textDecoration: 'none',
    display: 'block',
    width: '100%',
    padding: '0.5em 1.5em',
    color: '#1cd1a1',
  },
  activeLink: {
    backgroundColor: 'white',
    borderColor: '#f0f0f0',
    paddingLeft: '1.5em',
    paddingRight: '1.5em',
    textDecoration: 'underline',
    textDecorationColor: '#1cd1a1',
    borderRight: '1px solid rgba(0, 0, 0, .13)',
  },
}));
