import { Grid2 as Grid } from '@mui/material'
import { FunctionComponent } from 'react'

export interface ElementGridProps {
  elements: JSX.Element[]
}

export const ElementGrid: FunctionComponent<ElementGridProps> = ({
  elements,
}) => {
  return (
    <Grid container spacing={2} columnSpacing={2} size={12}>
      {elements.map((element, i) => (
        <Grid key={i}>{element}</Grid>
      ))}
    </Grid>
  )
}
