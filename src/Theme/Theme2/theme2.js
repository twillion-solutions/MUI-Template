import { createTheme } from '@mui/material/styles';

const ThemeTwo = createTheme({
  palette: {
    primary: {
      main: '#ff5722',
      icons:'#4e4e4e'
    },
    background: {
      default: '#e8e8e8',
      paper: '#f0f0f0',
    },
    text: {
      primary: '#000000',
    },
    button: {
      main: '#ff5722',
    },
  },
});

export default ThemeTwo;
