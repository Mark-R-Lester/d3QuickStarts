import { styled } from '@mui/material/styles'
import { FunctionComponent, useEffect, useState } from 'react'

const RowContainer = styled('div')(({ theme }) => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: '1%',
  bgcolor: 'background.paper',
  position: 'relative',
  '.two': {
    maxWidth: '49%',
    minWidth: '49%',
    justifyContent: 'left',
    bgcolor: 'background.paper',
    border: 'solid',
  },
  '.three': {
    maxWidth: '32%',
    minWidth: '32%',
    justifyContent: 'left',
    bgcolor: 'background.paper',
    border: 'solid',
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
