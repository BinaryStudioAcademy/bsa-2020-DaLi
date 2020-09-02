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
    lineHeight: 16,
    fontFamily: 'Poppins, Arial, sans-serif',
    fontWeightRegular: 'normal',
    h1: {
      fontFamily: 'Poppins, Arial, sans-serif',
      fontWeight: 'bold',
      fontSize: '36px',
      lineHeight: '54px',
    },
    h2: {
      fontFamily: 'Poppins, Arial, sans-serif',
      fontWeight: 'bold',
      fontSize: '16px',
      lineHeight: '24px',
    },
    body1: {
      fontFamily: 'Poppins, Arial, sans-serif',
      fontWeight: 'normal',
      fontSize: '16px',
      lineHeight: '24px',
    },
    body2: {
      fontFamily: 'Poppins, Arial, sans-serif',
      fontWeight: 'normal',
      fontSize: '14px',
      lineHeight: '163.42%',
    },
    subtitle2: {
      fontFamily: 'Poppins, Arial, sans-serif',
      fontWeight: 600,
      fontSize: '14px',
      lineHeight: '16px',
    },
    caption: {
      fontFamily: 'Open Sans, Arial, sans-serif',
      fontWeight: 'normal',
      fontSize: '12px',
      lineHeight: '16px',
    },
    button: {
      fontFamily: 'Open Sans, Arial, sans-serif',
      fontWeight: '600',
      fontSize: '14px',
      lineHeight: '19px',
    },
  },
  shape: {
    borderRadius: 4,
  },
  overrides: {
    MuiButton: {
      root: {
        textTransform: 'capitalize',
        borderRadius: '100px',
        width: '115px',
        height: '40px',
      },
      containedPrimary: {
        color: '#FFFFFF',
      },
      sizeLarge: {
        width: '210px',
        height: '50px',
      },
    },
    MuiIconButton: {
      root: {
        width: '34px',
        height: '34px',
        border: '1px solid #1CD1A1',
        boxSizing: 'border-box',
        color: '#1cd1a1',
      },
      sizeSmall: {
        width: '20px',
        height: '20px',
        border: 'none',
        color: '#858585',
      },
    },
    MuiSvgIcon: {
      root: {
        fontSize: '18px',
      },
      fontSizeLarge: {
        fontSize: '22px',
      },
    },
    MuiAppBar: {
      colorPrimary: {
        backgroundColor: '#FFFFFF',
      },
    },
    MuiTab: {
      wrapper: {
        color: '#858585',
        fontWeight: 500,
        textTransform: 'capitalize',
        fontSize: '14px',
        lineHeight: '21px',
      },
      textColorInherit: {
        opacity: 1,

        '&.Mui-selected .MuiTab-wrapper': {
          color: '#1CD1A1',
          fontWeight: 'normal',
        },
      },
    },
    MuiTabs: {
      root: {
        borderBottom: '1px solid #E0E0E0',
      },
      indicator: {
        backgroundColor: '#1CD1A1',
      },
    },
    MuiPopover: {
      root: {
        '& ~ #simple-popper': {
          backgroundColor: '#FAA9C6',
          width: '100px',
          boxSizing: 'border-box',
          height: 'max-content',
          color: '#FFF',
          fontSize: '12px',
          lineHeight: '14px',
          padding: '7px 15px',
          borderRadius: '4px',
          zIndex: 1,
          '&[x-placement*="bottom"]': {
            top: '10px !important',
          },
          '&[x-placement*="top"]': {
            bottom: '10px !important',
          },
          '&[x-placement*="bottom"] .arrow': {
            top: 0,
            left: 0,
            marginTop: '-0.9em',
            width: '3em',
            height: '1em',
            '&::before': {
              borderWidth: '0 1em 1em 1em',
              borderColor: 'transparent transparent #FAA9C6 transparent',
            },
          },
          '&[x-placement*="top"] .arrow': {
            bottom: 0,
            left: 0,
            marginBottom: '-0.9em',
            width: '3em',
            height: '1em',
            '&::before': {
              borderWidth: '1em 1em 0 1em',
              borderColor: '#FAA9C6 transparent transparent transparent',
            },
          },
          '& .arrow': {
            position: 'absolute',
            fontSize: 7,
            width: '3em',
            height: '3em',
            '&::before': {
              content: '""',
              margin: 'auto',
              display: 'block',
              width: 0,
              height: 0,
              borderStyle: 'solid',
            },
          },
        },
      },
    },
  },
});
