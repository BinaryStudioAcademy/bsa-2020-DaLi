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
    h3: {
      fontFamily: 'Poppins, Arial, sans-serif',
      fontWeight: 'bold',
      fontSize: '18px',
      lineHeight: '27px',
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
        fontSize: '28px',
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
    MuiPaper: {
      root: {
        backgroundColor: '#FFFFFF',
        borderRadius: '10px',
        width: '315px',
        height: '170px',
        display: 'grid',
        alignItems: 'center',
        padding: '0 30px 0',
        boxSizing: 'border-box',
        gridTemplateColumns: '35% 65%',
        '& .paper-analitics-icon': {
          border: '10px solid #FAA9C6',
          boxSizing: 'border-box',
          borderRadius: '100%',
          width: '80px',
          height: '80px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          transform: 'rotate(45deg)',
          borderLeftColor: '#1CD1A1',
          '& .MuiSvgIcon-root': {
            width: '20px',
            height: '20px',
            transform: 'rotate(-45deg)',
            color: '#1CD1A1',
          },
        },
        '& .paper-analitics-text': {
          marginLeft: '15px',
        },
        '& .paper-data-icon': {
          boxSizing: 'border-box',
          border: '1px solid #1CD1A1',
          borderRadius: '100%',
          width: '64px',
          height: '64px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          '& .MuiSvgIcon-root': {
            width: '25px',
            height: '25px',
            color: '#1CD1A1',
          },
        },
        '&.paper-collection-outlined': {
          gridTemplateColumns: '6% 94%',
        },
        '& .paper-collection-icon': {
          boxSizing: 'border-box',
          border: '1px solid #1CD1A1',
          borderRadius: '100%',
          width: '40px',
          height: '40px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          '& .MuiSvgIcon-root': {
            width: '15px',
            height: '15px',
            color: '#1CD1A1',
          },
        },
        '&.MuiPaper-outlined:hover': {
          cursor: 'pointer',
          backgroundColor: '#1CD1A1',
          border: 'none',
          boxShadow: '0 2px 3px rgba(0,0,0,0.3)',
          color: '#FFFFFF',
          '& .paper-analitics-icon': {
            borderLeftColor: '#FFFFFF',
            '& .MuiSvgIcon-root': {
              color: '#FFFFFF',
            },
          },
          '& .paper-analitics-text p': {
            color: '#FFFFFF',
          },
          '& .paper-analitics-text a': {
            textDecorationColor: '#FFFFFF',
          },
          '& .paper-data-icon, & .paper-collection-icon': {
            borderColor: '#FFFFFF',
            '& .MuiSvgIcon-root': {
              color: '#FFFFFF',
            },
          },
          '&::before': {
            backgroundColor: '#1CD1A1',
          },
        },
      },
      rounded: {
        backgroundColor: '#FFFFFF',
        borderRadius: '10px',
        width: '975px',
        height: '63px',
        boxSizing: 'border-box',
        position: 'relative',
        '&::before': {
          display: 'block',
          borderRadius: '7px',
          width: '25px',
          backgroundColor: '#FAA9C6',
          position: 'absolute',
          left: '-6px',
          height: '63px',
          zIndex: '-1',
        },
        '&.MuiPaper-outlined:hover': {
          boxShadow: 'none',
        },
      },
      outlined: {
        border: '2px solid #F0F0F0',
      },
    },
    MuiMenu: {
      paper: {
        height: 'auto',
        width: 'auto',
        border: 'none',
        padding: '0',
        gridTemplateColumns: '100%',
      },
    },
    MuiDialog: {
      paper: {
        height: 'auto',
        padding: '20px',
        '& form': {
          width: '100%',
        },
      },
    },
    MuiDialogContent: {
      root: {
        width: '100%',
        boxSizing: 'border-box',
        '& .MuiTypography-root': {
          padding: '10px 0',
        },
      },
    },
    MuiFormControl: {
      root: {
        width: '100%',
      },
    },
    MuiInputBase: {
      root: {
        height: '50px',
        width: '100%',
      },
      multiline: {
        height: 'auto',
      },
    },
    MuiCheckbox: {
      root: {
        border: 'none',
      },
    },
    MuiAlert: {
      root: {
        width: 'max-content',
        height: 'max-content',
      },
    },
    MuiAvatar: {
      root: {
        width: '50px',
        height: '50px',
        fontSize: '1.3rem',
      },
    },
    MuiNativeSelect: {
      root: {
        borderRadius: '4',
        position: 'relative',
        border: '1px solid #ced4da',
        padding: '10px 26px 10px 12px',
      },
    },
  },
});
