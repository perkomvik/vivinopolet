import { lightGreen, red, yellow } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: [
      "Roboto Mono",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    body1: {
      fontSize: "0.9rem",
    },
  },
  palette: {
    primary: {
      main: red[800],
    },
    secondary: {
      main: lightGreen[500],
    },
    warning: {
      main: yellow[700],
    },
  },
});

export default theme;
