import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  title: {
    color: 'rgb(116, 131, 143)',
    fontWeight: 900,
    marginTop: 20,
  },

  collectionItemContainer: {
    marginTop: 21,
    paddingRight: 10,
    color: 'rgb(116, 131, 143)',
    fontWeight: 700,
  },

  collectionItem: {
    width: '100%',
    borderRadius: '5px',
    margin: '10px 0',
    display: 'flex',
    justifyContent: 'start',
    '&:hover': {
      color: '#FFF',
      backgroundColor: '#1CD1A1',
    },
  },

  addCollection: {
    display: 'flex',
    alignItems: 'center',
    fontSize: 15,
    marginTop: 20,
    cursor: 'pointer',

    '&:hover': {
      color: '#1CD1A1',
    },
  },

  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
}));
