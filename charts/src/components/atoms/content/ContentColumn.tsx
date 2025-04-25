import { styled } from '@mui/material/styles'
import { FunctionComponent } from 'react'

const ColumnContainer = styled('div')(({ theme }) => ({
  marginLeft: '7%',
  marginRight: '10%',

  width: '80%',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  gap: '20px',
  bgcolor: 'background.paper',
}))

const ColumnItem = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  bgcolor: 'background.paper',
  // borderColor: 'red',
  // border: 'solid',
}))

interface ContentContainerProps {
  elements: JSX.Element[]
}

export const ContentColumn: FunctionComponent<ContentContainerProps> = ({
  elements,
}) => {
  return (
    <ColumnContainer>
      {elements.map((element, i) => (
        <ColumnItem key={i}>{element}</ColumnItem>
      ))}
    </ColumnContainer>
  )
}
