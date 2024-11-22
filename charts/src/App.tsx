import './App.css'
import { Box } from '@mui/material'
import { AppRoutes } from './AppRoutes'
import { ApplicationMenu } from './components/molecules/ApplicationMenu'

export default function App() {
  return (
    <>
      <Box sx={{ maxWidth: { xs: 320, sm: 480 }, bgcolor: 'background.paper' }}>
        <ApplicationMenu />
      </Box>
      <Box
        sx={{
          paddingLeft: { xs: 25, sm: 25 },
          paddingTop: { xs: 5, sm: 5 },
          bgcolor: 'background.paper',
        }}
      >
        <AppRoutes />
      </Box>
    </>
  )
}
