import { Typography } from '@mui/material'
import { ContentColumn } from '../../../components/atoms/content/ContentColumn'
import {
  ContentBox,
  ContentTextBox,
  ContentTitle,
} from '../../../components/atoms/content/ContentStyled'
import { ContentRow } from '../../../components/atoms/content/ContentRow'
import { AreaColorDemoChart } from './AreaColorDemoChart'

export const textEnumContent: JSX.Element = (
  <ContentColumn
    elements={[
      <ContentTitle key="title" variant="h3">
        Working with colors
      </ContentTitle>,

      <ContentBox>
        <Typography variant="h4" paddingBottom="20px">
          some text
        </Typography>
        <ContentColumn
          elements={[
            <ContentRow
              elements={[
                <ContentTextBox>
                  <Typography> some text</Typography>
                </ContentTextBox>,
                <AreaColorDemoChart chartName={`name`} />,
              ]}
            />,
          ]}
        />
      </ContentBox>,
    ]}
  />
)
