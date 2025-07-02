import { styled } from '@mui/material/styles'
import { FunctionComponent } from 'react'

const ColumnContainer = styled('div')(({ theme }) => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  gap: '20px',
}))

const ColumnItem = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
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
