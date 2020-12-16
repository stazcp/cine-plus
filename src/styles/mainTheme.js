import { createMuiTheme } from '@material-ui/core/styles'

export const theme = createMuiTheme({
  typography: {
    fontFamily: ['Source Sans Pro', 'Arial', 'sans-serif'].join(','),
  },
  palette: {
    primary: {
      main: '#000000',
    },
    secondary: {
      main: '#fff',
    },
  },
  overrides: {
    MuiTooltip: {
      tooltip: {
        backgroundColor: 'white',
        color: 'black',
        fontSize: '1em',
        fontWeight: '400',
      },
    },
  },
})
