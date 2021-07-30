import lightGreen from "@material-ui/core/colors/lightGreen";
import red from "@material-ui/core/colors/red";
import { createTheme } from "@material-ui/core/styles";

const theme = createTheme({
  typography: {
    fontFamily: [
      'Roboto Mono',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  palette: {
    primary: {
      main: red[800],
    },
    secondary: {
      main: lightGreen[500]
    },
  },
});

export default theme;