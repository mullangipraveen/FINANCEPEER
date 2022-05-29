import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#800080'
    },
    secondary: {
      main: '#1E90FF'
    }
  },
  typography: {
    fontFamily: 'Roboto'
  },
  shape: {
    borderRadius: 0
  },
  props: {
    MuiButton: {
      variant: 'contained',
      disableRipple: true,
      color: 'primary'
    },
    MuiTextField: {
      variant: 'outlined',
      InputLabelProps: {
        shrink: true
      }
    },
    MuiPaper: {
      elevation: 0
    }
  }
});
