import { Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import SyntaxHighlighter from 'react-syntax-highlighter'

export const ContentTitle = styled(Typography)(({ theme }) => ({
  marginTop: '70px',
  marginBottom: '0px',
}))

export const ContentSyntaxHighlighter = styled(SyntaxHighlighter)(
  ({ theme }) => ({
    width: '95%',
    borderRadius: '10px',
    border: 'solid',
    borderWidth: '10px',
    borderColor: '#282c34',
  })
)
