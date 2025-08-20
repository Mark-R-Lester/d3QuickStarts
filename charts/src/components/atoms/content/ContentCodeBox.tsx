import { styled } from '@mui/material/styles'
import { FunctionComponent } from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'

export const SyntaxBox = styled('div')(({ theme }) => ({
  marginTop: '1%',
  width: '98%',
  borderRadius: '10px',
  border: 'solid',
  borderWidth: '10px',
  borderColor: '#282c34',
  backgroundColor: '#282c34',
}))

interface ContentContainerProps {
  code: string
}

export const ContentCodeBox: FunctionComponent<ContentContainerProps> = ({
  code,
}) => {
  return (
    <SyntaxBox>
      <SyntaxHighlighter
        language="typescript"
        style={atomOneDark}
        showLineNumbers={true}
      >
        {code}
      </SyntaxHighlighter>
    </SyntaxBox>
  )
}
