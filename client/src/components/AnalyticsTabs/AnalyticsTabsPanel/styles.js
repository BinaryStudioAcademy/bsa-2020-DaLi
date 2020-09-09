import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: 'white',
    marginTop: 8,
    boxShadow: 'rgba(0, 0, 0, 0.08) 0px 7px 20px',
    transition: 'all 0.2s linear 0s',
    alignItems: 'start',
    padding: 0,
    borderRadius: 10,
  },
  itemContainer: {
    display: 'flex',
    alignItems: 'center',
    padding: 16,
    color: '',
    borderBottom: '1px solid rgb(237, 242, 245)',
    '&:last-child': {
      borderRadius: 10,
    },
    '&:hover': {
      color: 'rgb(80, 158, 227)',
      backgroundColor: '#f9fbfc',
      cursor: 'pointer',
      transition: '0.3s',

      '& $menuIcon': {
        opacity: 1,
      },
      '& $moveIcon': {
        opacity: 1,
      },
      '& $icon': {
        opacity: 1,
        color: 'rgb(80, 158, 227)',
      },
    },
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    color: 'inherit',
    flex: 1,
    textDecoration: 'none',
    '& span': {
      marginLeft: 10,
      fontSize: 18,
    },
  },
  menuIcon: {
    opacity: 0,
    width: 20,
    height: 20,
    padding: 10,
    borderRadius: 50,
    '&:hover': {
      backgroundColor: 'rgb(237, 242, 245)',
      color: '#ff5252',
    },
  },
  moveIcon: {
    opacity: 0,
    width: 20,
    height: 20,
    padding: 10,
    borderRadius: 50,
    '&:hover': {
      backgroundColor: 'rgb(237, 242, 245)',
    },
  },
  icon: {
    backgroundColor: '#efeeee',
    width: 30,
    height: 30,
    padding: 5,
    borderRadius: 5,
    color: '#4e4d4d',
  },
  description: {
    color: '#808080',
  },
  menuItem: {
    color: '#808080',
  },
}));
