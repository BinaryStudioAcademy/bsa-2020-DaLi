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
  popper: {
    width: '300px !important',
    height: '300px !important',
  },
  colorBox: {
    boxSizing: 'border-box',
    padding: '10px',
    borderRadius: '50%',
    border: '1px solid #f0f0f0',
  },
  colorSquare: {
    boxSizing: 'border-box',
    width: '21px',
    height: '21px',
    cursor: 'pointer',
    borderRadius: '50%',
  },
  colorPalette: {
    padding: '0.5rem',
    width: '120px',
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
    height: '40px',
    // width: '300px',
    boxSizing: 'border-box',
    borderRadius: '4px',
    border: '1px solid rgba(0, 0, 0, 0.23)',
    // padding: '18.5px 14px',
    fontFamily: 'Poppins, Arial, sans-serif',
    fontSize: '16px',
  },
  btnParams: {
    boxSizing: 'border-box',
    display: 'flex',
    background: 'rgb(237, 242, 245)',
    borderRadius: '6px',
  },
  btnGroup: {
    marginLeft: '0.5rem',
    borderRadius: '4px',
    alignSelf: 'stretch',
    display: 'flex',
    border: '1px solid #f0f0f0',
  },
  btnItem: {
    padding: '0.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: '1 0 auto',
    cursor: 'pointer',
  },
  iconStyles: {
    flexShrink: '0',
    width: '16px',
    height: '16px',
  },
}));
