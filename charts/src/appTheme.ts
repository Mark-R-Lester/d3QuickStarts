import { createTheme } from '@mui/material/styles'

export const appTheme = createTheme({
  palette: {
    primary: {
      main: '#1976d5',
      contrastText: 'white',
    },
  },
  typography: {
    body1: {
      fontSize: 20,
    },
    body2: {
      fontSize: 18,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          variants: [
            {
              props: { variant: 'text' },
              style: {
                fontSize: 20,
              },
            },
          ],
        },
      },
    },
  },
})
