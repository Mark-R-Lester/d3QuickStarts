import { createTheme, PaletteColorOptions } from '@mui/material'

declare module '@mui/material/styles' {
  interface CustomPalette {
    white: PaletteColorOptions
  }
  interface Palette extends CustomPalette {}
  interface PaletteOptions extends CustomPalette {}
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    white: true
  }
}

const { palette } = createTheme()
const { augmentColor } = palette
const createColor = (mainColor: string) =>
  augmentColor({ color: { main: mainColor } })
createTheme({
  palette: {
    white: createColor('#5DBA40'),
  },
})
