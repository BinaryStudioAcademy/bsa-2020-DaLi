import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  tabsHeader: {
    boxShadow: 'none',
    backgroundColor: 'inherit',
  },
  tabsContainer: {
    width: '100%',
    borderBottom: '1px solid #f0f0f0',
  },
  tabsButtons: {
    color: '#000000',
    fontWeight: 900,
    width: '100%',
    borderBottom: '1px solid #f0f0f0',
    fontSize: 12,
    '&$selected': {
      color: '#509ee3',
    },
  },
  selected: {},
  indicator: {
    backgroundColor: '#509ee3',
  },
}));
