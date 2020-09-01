import { createMuiTheme } from '@material-ui/core';

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1CD1A1',
    },
    secondary: {
      main: '#FAA9C6',
    },
    text: {
      primary: '#4E4E4E',
      secondary: '#858585',
    },
    background: {
      default: '#FAFAFA',
    },
  },
  typography: {
    htmlFontSize: 16,
    fontSize: 14,
    fontFamily: 'Poppins, Arial, sans-serif',
    fontWeightRegular: 'normal',
  },
});
