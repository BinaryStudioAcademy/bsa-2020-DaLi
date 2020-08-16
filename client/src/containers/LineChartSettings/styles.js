import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: '100%',
    maxWidth: '400px',
    flexDirection: 'column',
  },
  backBtn: {
    marginBottom: '2rem',
    alignSelf: 'flex-start',
  },
  tabs: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '3rem',
  },
  tab: {
    minWidth: 100,
    backgroundColor: '#519ee3',
    color: 'white',
    borderRadius: '2rem',
    marginRight: '1rem',
    padding: '0.5rem',
  },
  indicator: {
    display: 'none',
  },
  btn: {
    backgroundColor: '#519ee3',
    color: 'white',
    borderRadius: '2rem',
    padding: '1rem 4rem',
  },
  btnWrapper: {
    marginTop: 'auto',
    marginBottom: '2rem',
    display: 'flex',
    justifyContent: 'center',
    width: 300,
  },
  formControl: {
    margin: theme.spacing(1),
    width: 300,
    maxWidth: 300,
    display: 'block',
    marginBottom: '3rem',
  },
  select: {
    maxWidth: '300px',
    width: 300,
  },
  label: {
    fontSize: 'bold',
    fontWeight: '2rem',
  },
  input: {
    display: 'flex',
    margin: '25px 0px',
  },
  colorPicker: {
    display: 'flex',
    margin: '25px 25px 25px 0',
  },
  btnGroup: {
    display: 'flex',
  },
  btnItem: {
    flex: 1,
    marginTop: '5px',
    marginBottom: '10px',
    borderColor: '#519ee3',
    color: 'black',
    textTransform: 'none',
    '&$selected': {
      backgroundColor: '#86BBEB',
      color: 'white',
    },
  },
  selected: {
    backgroundColor: '#86BBEB',
  },
  legend: {
    color: 'black',
    marginTop: '5px',
  },
}));
