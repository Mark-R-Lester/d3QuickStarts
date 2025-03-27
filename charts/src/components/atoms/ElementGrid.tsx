import { Grid2 as Grid } from '@mui/material'
import { FunctionComponent } from 'react'

export interface ElementGridProps {
  elements: JSX.Element[]
  onClick?: (index: number) => void
}

export const ElementGrid: FunctionComponent<ElementGridProps> = ({
  elements,
  onClick,
}) => {
  return (
    <Grid container spacing={2} columnSpacing={2}>
      {elements.map((element, i) => (
        <Grid
          key={i}
          onClick={() => (onClick === undefined ? undefined : onClick(i))}
        >
          {element}
        </Grid>
      ))}
    </Grid>
  )
}
