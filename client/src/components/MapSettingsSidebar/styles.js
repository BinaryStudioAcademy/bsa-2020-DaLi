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
    width: '100%',
  },
  formControl: {
    margin: theme.spacing(1),
    width: 300,
    maxWidth: 300,
    display: 'block',
    marginBottom: '3rem',
  },
  select: {
    height: '50px',
    width: '300px',
    boxSizing: 'border-box',
    borderRadius: '4px',
    '&:before': {
      borderBottom: 'none',
    },
    '&:after': {
      borderBottom: 'none',
    },
    '&:hover': {
      borderBottom: 'none',
    },
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
  trendlineSwitch: {
    marginBottom: '20px',
  },
  legend: {
    color: 'black',
    marginTop: '10px',
  },
}));

export const switchStyles = makeStyles((theme) => ({
  root: {
    width: 70,
    margin: theme.spacing(1),
    overflow: 'unset',
  },
  switchBase: {
    padding: 1,
    border: 'none',
    '&$checked': {
      transform: 'translateX(44px)',
      color: theme.palette.common.white,
      '& + $track': {
        backgroundColor: '#1CD1A1',
        opacity: 1,
        border: 'none',
      },
    },
    '&$focusVisible $thumb': {
      color: '#1CD1A1',
    },
  },
  thumb: {
    width: 24,
    height: 24,
  },
  track: {
    border: '1px solid #CFD7DF',
    backgroundColor: '#F2F2F2',
    opacity: 1,
    transition: theme.transitions.create(['background-color', 'border']),
  },
  checked: {},
  focusVisible: {},
}));
