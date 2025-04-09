import { styled } from '@mui/material/styles'
import { FunctionComponent } from 'react'

const ThemedContainer = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(5),
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  bgcolor: 'background.paper',
  position: 'relative',
}))

const ThemedItem = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-evenly',
  flexGrow: 0,
  bgcolor: 'background.paper',
}))

interface ContentContainerProps {
  elements: JSX.Element[]
}

export const ContentContainer: FunctionComponent<ContentContainerProps> = ({
  elements,
}) => {
  return (
    <ThemedContainer>
      {elements.map((element, i) => (
        <ThemedItem key={i}>{element}</ThemedItem>
      ))}
    </ThemedContainer>
  )
}
