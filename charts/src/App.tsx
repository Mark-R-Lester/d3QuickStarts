import './App.css'
import { Box, Container } from '@mui/material'
import { PageContainer } from '@toolpad/core'
import { makeStyles } from '@mui/styles'
import { AppRoutes } from './components/atoms/AppRoutes'
import { ApplicationMenu } from './components/molecules/ApplicationMenu'

const useStyles = makeStyles({
  root: {
    display: 'flex',
  },
})

export default function App() {
  const classes = useStyles()

  return (
    <>
      <Container maxWidth="xl" className={classes.root}>
        <Box
          sx={{ maxWidth: { xs: 320, sm: 480 }, bgcolor: 'background.paper' }}
        >
          <ApplicationMenu />
        </Box>
        <PageContainer sx={{ bgcolor: '' }}>
          <AppRoutes />
        </PageContainer>
      </Container>
    </>
  )
}
