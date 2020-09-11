import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  viewVisualizationHeader: {
    height: '60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 40px',
    width: '100%',
    boxSizing: 'border-box',
  },

  viewVisualizationTitle: {
    alignItems: 'center',
  },

  viewVisualizationTitleName: {
    fontWeight: '500',
    fontSize: '20px',
  },

  viewVisualizationTitleSection: {
    color: 'gray',
  },

  viewVisualizationTitleDescription: {
    fontSize: '13px',
  },
  viewVisualizationTitleIcon: {
    color: 'gray',
    fontSize: '22px',
    cursor: 'pointer',
    marginLeft: '0 20px',
  },

  viewVisualizationButtons: {
    flexDirection: 'row',
    height: '40px',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  mr10: {
    marginRight: 10,
  },

  viewVisualizationDeleteButton: {
    color: 'white',
    textTransform: 'none',
    background: 'red',
    '&:hover': {
      background: 'red',
    },
    borderRadius: '5px',
    marginRight: '20px',
  },

  chip: {
    margin: theme.spacing(0.5),
    borderRadius: 5,
    fontWeight: 'bold',
    backgroundColor: '#E2E3EF',
    color: '#7172AD',
  },

  toggleFiltersChip: {
    margin: theme.spacing(0.5),
    borderRadius: 5,
    fontWeight: 'bold',
    color: '#E2E3EF',
    backgroundColor: '#7172AD',
  },
}));

export default useStyles;
