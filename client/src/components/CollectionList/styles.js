import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  title: {
    color: 'rgb(116, 131, 143)',
    fontWeight: 900,
    marginTop: 20,
  },

  collectionItemContainer: {
    marginTop: 30,
    paddingRight: 10,
    color: 'rgb(116, 131, 143)',
    fontWeight: 700,
  },

  collectionItem: {
    boxSizing: 'border-box',
    padding: '16px 10px',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'rgb(237, 242, 245)',
    borderRadius: 4,
    marginBottom: 15,

    '& span': {
      marginLeft: 5,
      textOverflow: 'ellipsis',
      overflow: 'hidden',
    },

    '&:hover': {
      backgroundColor: '#edf2f557',
      color: '#509ee3',
    },
  },

  addCollection: {
    display: 'flex',
    alignItems: 'center',
    fontSize: 15,
    marginTop: 20,
    cursor: 'pointer',

    '&:hover': {
      color: 'rgb(80, 158, 227)',
    },
  },

  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
}));
