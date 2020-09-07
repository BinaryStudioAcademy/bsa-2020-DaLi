import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '1rem',
    paddingTop: '1rem',
    // paddingLeft: '2rem',
    // paddingRight: '2rem',
    borderTop: '1px solid #f0f0f0',
  },
  bar: {
    display: 'flex',
    alignItems: 'center',
  },
  colorBox: {
    boxSizing: 'border-box',
    padding: '5px',
    borderRadius: '4px',
    border: '1px solid #f0f0f0',
  },
  colorSquare: {
    width: '21px',
    height: '21px',
    cursor: 'pointer',
    // backgroundColor: 'rgb(80,158,227)',
    borderRadius: '2px',
  },
  colorPalette: {
    padding: '0.5rem',
  },
  colorPaletteInner: {
    display: 'flex',
    flexWrap: 'wrap',
    maxWidth: '120px',
    padding: '0',
    margin: '0',
    listStyleType: 'none',
  },
  colorItemWrapper: {
    padding: '4px',
    cursor: 'pointer',
  },
  colorItem: {
    width: '32px',
    height: '32px',
    borderRadius: '4px',
  },
  formControl: {
    margin: theme.spacing(1),
    width: 300,
    maxWidth: 300,
    display: 'block',
    marginBottom: '3rem',
  },
  label: {
    fontSize: 'bold',
    fontWeight: '2rem',
  },
  input: {
    paddingLeft: '0.75rem',
    paddingRight: '0.75rem',
    marginLeft: '0.5rem',
  },
  btnParams: {
    boxSizing: 'border-box',
    display: 'flex',
    background: 'rgb(237, 242, 245)',
    borderRadius: '6px',
  },
}));
