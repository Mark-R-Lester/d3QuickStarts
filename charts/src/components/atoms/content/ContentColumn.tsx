import { styled } from '@mui/material/styles'
import { FunctionComponent } from 'react'

export enum JustifyOptions {
  RIGHT = 'right',
  CENTER = 'center',
  LEFT = 'left',
}

const ColumnContainer = styled('div', {
  shouldForwardProp: (prop) => prop !== 'justify' && prop !== 'gap',
})<{ justify?: JustifyOptions; gap?: number }>(
  ({ theme, justify = JustifyOptions.CENTER, gap = 20 }) => ({
    width: '100%',
    display: 'flex',
    justifyContent: justify,
    flexDirection: 'column',
    gap: `${gap}px`,
  })
)

const ColumnItem = styled('div', {
  shouldForwardProp: (prop) => prop !== 'justify',
})<{ justify?: JustifyOptions }>(
  ({ theme, justify = JustifyOptions.CENTER }) => ({
    display: 'flex',
    justifyContent: justify,
  })
)

interface ContentContainerProps {
  elements: JSX.Element[]
  justify?: JustifyOptions
  gap?: number
}

export const ContentColumn: FunctionComponent<ContentContainerProps> = ({
  elements,
  justify = JustifyOptions.CENTER,
  gap = 20,
}) => {
  return (
    <ColumnContainer justify={justify} gap={gap}>
      {elements.map((element, i) => (
        <ColumnItem key={i} justify={justify}>
          {element}
        </ColumnItem>
      ))}
    </ColumnContainer>
  )
}
