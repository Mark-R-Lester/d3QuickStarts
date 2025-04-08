import { Box } from '@mui/material'

import { AppRoutes } from './AppRoutes'
import { ApplicationRootLayout } from './components/molecules/ApplicationMenuSystem/ApplicationRootLayout'

export default function App() {
  return (
    <>
      <Box>
        <ApplicationRootLayout />
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
