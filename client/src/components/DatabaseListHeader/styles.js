import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
  databaseListHeader: {
    height: '60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    boxSizing: 'border-box',
    paddingLeft: 16,
  },
  databaseListTitle: {
    fontWeight: '500',
    fontSize: '20px',
  },
  addDatabaseButton: {
    color: 'white',
    textTransform: 'none',
    background: '#3ca1de',
    '&:hover': {
      background: '#3ca1de',
    },
    borderRadius: '5px',
  },
});
