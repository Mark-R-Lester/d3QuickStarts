import { styled } from '@mui/material/styles'
import { FunctionComponent } from 'react'

const ColumnContainer = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(5),
  width: '90%',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  gap: '20px',
  flexWrap: 'wrap',
  bgcolor: 'background.paper',
}))

const ColumnItem = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  bgcolor: 'background.paper',
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
