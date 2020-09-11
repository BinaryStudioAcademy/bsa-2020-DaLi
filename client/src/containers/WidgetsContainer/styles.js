import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  title: {
    display: 'flex',
    marginTop: 25,
  },
  collectionContainer: {
    padding: '30px 0',
    borderBottom: '1px solid #F0F0F0',
    display: 'flex',
    marginBottom: 40,

    '& > div': {
      marginRight: 10,
    },
    '& > div:last-child': {
      marginRight: 0,
    },
  },
  dataContainer: {
    padding: '30px 0',
    display: 'flex',
    '& > .database-link': {
      marginRight: 10,
      textDecoration: 'none',
    },
    '& > .database-link:last-child': {
      marginRight: 0,
    },
  },
  collectionName: {
    maxHeight: 25,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    width: 150,
    display: 'inline-block',
    whiteSpace: 'nowrap',
  },
  collectionDescription: {
    maxHeight: 25,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    width: 150,
    display: 'inline-block',
    whiteSpace: 'nowrap',
  },
}));
