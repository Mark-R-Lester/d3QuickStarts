import { styled } from '@mui/material/styles'
import { FunctionComponent } from 'react'

const ChartButtonTheme = styled('div')(({ theme }) => ({
  '.normal': {
    borderStyle: 'solid',
    borderWidth: '2px',
    borderRadius: '5px',
    '&: hover': {
      borderColor: '#39d615',
      boxShadow: '0px 0px 10px #39d615',
    },
  },
  '.clicked': {
    borderStyle: 'solid',
    borderWidth: '2px',
    borderRadius: '5px',
    borderColor: '#0e52e6',
    boxShadow: '0px 0px 10px #0e52e6',
  },
}))

export enum ChartButtonStyles {
  NORMAL = 'normal',
  CLICKED = 'clicked',
}

interface ChartButtonProps {
  id: number
  chart: JSX.Element
  style: ChartButtonStyles
  onClick: (id: number) => void
}

export const ChartButton: FunctionComponent<ChartButtonProps> = ({
  id,
  chart,
  style,
  onClick,
}) => {
  const clicked = () => {
    onClick(id)
  }
  return (
    <ChartButtonTheme>
      <div onClick={clicked} className={style}>
        {chart}
      </div>
    </ChartButtonTheme>
  )
}
