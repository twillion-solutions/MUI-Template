import { createTheme } from '@mui/material/styles';

const ThemeOne = createTheme({
  palette: {
    primary: {
      main: '#ffffff', 
    },
    background: {
      default: '#2c2c2c',
      paper: '#121212',
    },
    text: {
      primary: '#ffffff',
    },
    button: {
      main: '#ffffff',
    },
  },

});

export default ThemeOne;

