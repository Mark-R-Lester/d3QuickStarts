import { styled } from '@mui/material/styles'
import { FunctionComponent, useEffect, useState } from 'react'

const RowContainer = styled('div')(({ theme }) => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'row',
  alignItems: 'flex-start',
  gap: '1%',
  bgcolor: 'background.paper',
  position: 'relative',
  '.two': {
    maxWidth: '49%',
    minWidth: '49%',
    justifyContent: 'left',
    bgcolor: 'background.paper',
  },
  '.three': {
    maxWidth: '32%',
    minWidth: '32%',
    justifyContent: 'left',
    bgcolor: 'background.paper',
  },
  [theme.breakpoints.down('xl')]: {
    display: 'block !important',
    flexDirection: 'column !important',
    width: '100% !important',
    maxWidth: '100% !important',
    margin: '0 !important',
    padding: '0 8px !important',
    '& > div.two': {
      width: '100% !important',
      maxWidth: '100% !important',
      minWidth: '100% !important',
      display: 'block !important',
      margin: '0 !important',
      padding: '0 8px !important',
      boxSizing: 'border-box',
    },
    '& > div.three': {
      width: '100% !important',
      maxWidth: '100% !important',
      minWidth: '100% !important',
      display: 'block !important',
      margin: '0 !important',
      padding: '0 8px !important',
      boxSizing: 'border-box',
    },
  },
}))

interface ContentContainerProps {
  elements: JSX.Element[]
}

enum ContentRowStyles {
  TWO = 'two',
  THREE = 'three',
}

export const ContentRow: FunctionComponent<ContentContainerProps> = ({
  elements,
}) => {
  const [style, setStyle] = useState<ContentRowStyles>(ContentRowStyles.TWO)

  useEffect(() => {
    elements.length === 2
      ? setStyle(ContentRowStyles.TWO)
      : setStyle(ContentRowStyles.THREE)
  }, [elements.length])

  return (
    <RowContainer>
      {elements.map((element, i) => (
        <div key={i} className={style}>
          {element}
        </div>
      ))}
    </RowContainer>
  )
}
