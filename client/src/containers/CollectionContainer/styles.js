import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  link: {
    textDecoration: 'none',
    color: '#74838f',
    textTransform: 'uppercase',
    fontWeight: 700,
    fontSize: 12,
    letterSpacing: 2,
  },
  collectionName: {
    marginTop: 0,
    marginBottom: 10,
  },
  collectionDescription: {
    color: '#74838f',
    cursor: 'pointer',
    fontSize: 20,
    marginLeft: 20,
  },
  headerContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  titleContainer: {
    flex: 1,
  },
  icon: {
    color: '#74838f',
    marginLeft: 10,
    padding: 10,

    '&:hover': {
      backgroundColor: 'rgb(237, 242, 245)',
      borderRadius: 50,
      color: '#000000',
    },
  },
}));
