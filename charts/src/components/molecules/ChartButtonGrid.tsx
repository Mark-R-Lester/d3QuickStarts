import { Grid2 as Grid } from '@mui/material'
import { FunctionComponent, useState } from 'react'
import { ChartButton, ChartButtonStyles } from '../atoms/ChartButton'

export interface ElementGridProps {
  elements: JSX.Element[]
  onClick: (id: number) => void
  selected?: number
}

export const ChartButtonGrid: FunctionComponent<ElementGridProps> = ({
  elements,
  onClick,
  selected = 0,
}) => {
  const [lastClicked, setLastClicked] = useState<number>(selected)

  return (
    <Grid container spacing={2} columnSpacing={2}>
      {elements.map((element, i) => (
        <ChartButton
          key={i}
          id={i}
          chart={element}
          style={
            lastClicked === i
              ? ChartButtonStyles.CLICKED
              : ChartButtonStyles.NORMAL
          }
          onClick={() => {
            onClick(i)
            setLastClicked(i)
          }}
        />
      ))}
    </Grid>
  )
}
