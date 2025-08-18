import { Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

export const ContentTitle = styled(Typography)(({ theme }) => ({
  marginTop: '70px',
  marginBottom: '0px',
}))

export const ContentSyntaxBox = styled('div')(({ theme }) => ({
  marginTop: '1%',
  width: '98%',
  borderRadius: '10px',
  border: 'solid',
  borderWidth: '10px',
  borderColor: '#282c34',
  backgroundColor: '#282c34',
}))

export const ContentTextBox = styled('div')(({ theme }) => ({
  marginTop: '1%',
  width: '98%',
  borderRadius: '10px',
  border: 'solid',
  borderWidth: '10px',
  borderColor: '#f2f2f2',
  backgroundColor: '#f2f2f2',
}))

export const ContentChartBox = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '98%',
  height: '95%',
}))

export const ContentBox = styled('div')(({ theme }) => ({
  marginLeft: '7%',
  marginRight: '10%',
  width: '80%',
  justifyContent: 'center',
  borderRadius: '10px',
  border: 'solid',
  borderWidth: '10px',
  borderColor: '#f2f2f2',
  backgroundColor: '#f2f2f2',
  [theme.breakpoints.down('xl')]: {
    marginLeft: '0%',
    marginRight: '0%',
    width: '100%',
  },
  [theme.breakpoints.down('lg')]: {
    marginLeft: '0%',
    marginRight: '0%',
    width: '100%',
  },
}))
