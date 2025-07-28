import { Typography } from '@mui/material'
import { ContentColumn } from '../../components/atoms/content/ContentColumn'
import {
  ContentBox,
  ContentTextBox,
  ContentTitle,
} from '../../components/atoms/content/ContentStyled'
import { ContentRow } from '../../components/atoms/content/ContentRow'
import { TextEnumDemoChart } from './TextEnumDemoChart'
import {
  QsEnumAlignmentBaseline,
  QsEnumColorDarkBlues,
  QsEnumColorDarkBrowns,
  QsEnumColorDarkGreens,
  QsEnumColorGreys,
  QsEnumColorLightBlues,
  QsEnumColorLightBrowns,
  QsEnumColorLightGreens,
  QsEnumColorOranges,
  QsEnumColorPurples,
  QsEnumColorReds,
  QsEnumColorYellows,
  QsEnumCurve,
  QsEnumLineCap,
  QsEnumLineJoin,
  QsEnumTextAnchor,
  QsEnumTextDecorationLine,
  QsEnumTextFont,
  QsEnumTextFontStyle,
  QsEnumTextFontWeight,
} from 'd3qs/d3QuickStart'
import { EnumType, LineEnumDemoChart } from './LineEnumDemoChart'
import { ColorEnumDemoChart } from './ColorEnumDemoChart'

const textEnumCollection = [
  {
    enumName: 'QsEnumAlignmentBaseline',
    enumValues: QsEnumAlignmentBaseline,
    propKey: 'textAlignmentBaseline',
    chartNamePrefix: 'align',
  },
  {
    enumName: 'QsEnumTextAnchor',
    enumValues: QsEnumTextAnchor,
    propKey: 'textAnchor',
    chartNamePrefix: 'anchor',
  },
  {
    enumName: 'QsEnumTextFontWeight',
    enumValues: QsEnumTextFontWeight,
    propKey: 'textFontWeight',
    chartNamePrefix: 'weight',
  },
  {
    enumName: 'QsEnumTextFontStyle',
    enumValues: QsEnumTextFontStyle,
    propKey: 'textFontStyle',
    chartNamePrefix: 'style',
  },
  {
    enumName: 'QsEnumTextDecorationLine',
    enumValues: QsEnumTextDecorationLine,
    propKey: 'textDecorationLine',
    chartNamePrefix: 'decorator',
  },
  {
    enumName: 'QsEnumTextFont',
    enumValues: QsEnumTextFont,
    propKey: 'textFont',
    chartNamePrefix: 'font',
  },
]

const sanitizeChartName = (input: string): string => input.replace(/\s/g, '')

export const textEnumContent: JSX.Element = (
  <ContentColumn
    elements={[
      <ContentTitle key="title" variant="h3">
        Text Enums
      </ContentTitle>,
      ...textEnumCollection.map(
        ({ enumName, enumValues, propKey, chartNamePrefix }) => (
          <ContentBox key={enumName}>
            <Typography variant="h4" paddingBottom="20px">
              {enumName}
            </Typography>
            <ContentColumn
              elements={Object.entries(enumValues)
                .filter(([key]) => isNaN(Number(key))) // Filter out numeric keys
                .map(([key, value]) => (
                  <ContentRow
                    key={`${enumName}-${key}`}
                    elements={[
                      <ContentTextBox>
                        <Typography variant="body1">{key}</Typography>
                      </ContentTextBox>,
                      <TextEnumDemoChart
                        chartName={`${chartNamePrefix}${sanitizeChartName(value)}`}
                        text={value}
                        {...{ [propKey]: value }}
                      />,
                    ]}
                  />
                ))}
            />
          </ContentBox>
        )
      ),
    ]}
  />
)

const lineEnumCollection = [
  {
    enumName: 'QsEnumCurve',
    enumValues: QsEnumCurve,
    propKey: 'curve',
    chartNamePrefix: 'curve',
    type: EnumType.CURVE,
  },
  {
    enumName: 'QsEnumLineJoin',
    enumValues: QsEnumLineJoin,
    propKey: 'strokeLineJoin',
    chartNamePrefix: 'join',
    type: EnumType.JOIN,
  },
  {
    enumName: 'QsEnumLineCap',
    enumValues: QsEnumLineCap,
    propKey: 'strokeLineCap',
    chartNamePrefix: 'cap',
    type: EnumType.CAP,
  },
]

export const lineEnumContent: JSX.Element = (
  <ContentColumn
    elements={[
      <ContentTitle key="title" variant="h3">
        Line Enums
      </ContentTitle>,
      ...lineEnumCollection.map(
        ({ enumName, enumValues, propKey, chartNamePrefix, type }) => (
          <ContentBox key={enumName}>
            <Typography variant="h4" paddingBottom="20px">
              {enumName}
            </Typography>
            <ContentColumn
              elements={Object.entries(enumValues)
                .filter(([key]) => isNaN(Number(key))) // Filter out numeric keys
                .map(([key, value]) => (
                  <ContentRow
                    key={`${enumName}-${key}`}
                    elements={[
                      <ContentTextBox>
                        <Typography variant="body1">{key}</Typography>
                      </ContentTextBox>,
                      <LineEnumDemoChart
                        chartName={`${chartNamePrefix}${sanitizeChartName(value)}`}
                        type={type}
                        {...{ [propKey]: value }}
                      />,
                    ]}
                  />
                ))}
            />
          </ContentBox>
        )
      ),
    ]}
  />
)

const colorEnumCollection = [
  {
    enumName: 'QsEnumColorLightBlues',
    enumValues: QsEnumColorLightBlues,
    propKey: 'lightBlue',
    chartNamePrefix: 'lightBlue',
  },
  {
    enumName: 'QsEnumColorDarkBlues',
    enumValues: QsEnumColorDarkBlues,
    propKey: 'darkBlue',
    chartNamePrefix: 'darkBlue',
  },
  {
    enumName: 'QsEnumColorLightGreens',
    enumValues: QsEnumColorLightGreens,
    propKey: 'lightGreen',
    chartNamePrefix: 'lightGreen',
  },
  {
    enumName: 'QsEnumColorDarkGreens',
    enumValues: QsEnumColorDarkGreens,
    propKey: 'darkGreen',
    chartNamePrefix: 'darkGreen',
  },
  {
    enumName: 'QsEnumColorGreys',
    enumValues: QsEnumColorGreys,
    propKey: 'grey',
    chartNamePrefix: 'grey',
  },
  {
    enumName: 'QsEnumColorReds',
    enumValues: QsEnumColorReds,
    propKey: 'red',
    chartNamePrefix: 'red',
  },
  {
    enumName: 'QsEnumColorYellows',
    enumValues: QsEnumColorYellows,
    propKey: 'yellow',
    chartNamePrefix: 'yellow',
  },
  {
    enumName: 'QsEnumColorPurples',
    enumValues: QsEnumColorPurples,
    propKey: 'purple',
    chartNamePrefix: 'purple',
  },
  {
    enumName: 'QsEnumColorLightBrowns',
    enumValues: QsEnumColorLightBrowns,
    propKey: 'lightBrown',
    chartNamePrefix: 'lightBrown',
  },
  {
    enumName: 'QsEnumColorDarkBrowns',
    enumValues: QsEnumColorDarkBrowns,
    propKey: 'darkBrown',
    chartNamePrefix: 'darkBrown',
  },
  {
    enumName: 'QsEnumColorOranges',
    enumValues: QsEnumColorOranges,
    propKey: 'orange',
    chartNamePrefix: 'orange',
  },
]

export const colorEnumContent: JSX.Element = (
  <ContentColumn
    elements={[
      <ContentTitle key="title" variant="h3">
        Color Enums
      </ContentTitle>,
      ...colorEnumCollection.map(
        ({ enumName, enumValues, propKey, chartNamePrefix }) => (
          <ContentBox key={enumName}>
            <Typography variant="h4" paddingBottom="20px">
              {enumName}
            </Typography>
            <ContentColumn
              elements={Object.entries(enumValues)
                .filter(([key]) => isNaN(Number(key))) // Filter out numeric keys
                .map(([key, value]) => (
                  <ContentRow
                    key={`${enumName}-${key}`}
                    elements={[
                      <Typography variant="body1">{key}</Typography>,

                      <ColorEnumDemoChart
                        chartName={`${chartNamePrefix}${key}`}
                        color={value}
                        {...{ [propKey]: value }}
                      />,
                    ]}
                  />
                ))}
            />
          </ContentBox>
        )
      ),
    ]}
  />
)
