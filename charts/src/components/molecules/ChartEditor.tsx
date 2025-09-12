import { FunctionComponent, useEffect, useState } from 'react'
import AceEditor from 'react-ace'
import 'ace-builds/src-noconflict/mode-javascript'
import 'ace-builds/src-noconflict/theme-monokai'
import 'ace-builds/src-noconflict/worker-javascript'
import ace from 'ace-builds'
import { transpile } from 'typescript'
import {
  qsCreateCanvasOrthogonal,
  QsEnumAxisScaleType,
  QsEnumColorScale,
  QsEnumCurve,
  QsEnumAlignmentBaseline,
  QsEnumTextAnchor,
  QsEnumTextFontWeight,
  QsEnumTextFontStyle,
  QsEnumTextDecorationLine,
  QsEnumTextFont,
  QsEnumLineJoin,
  QsEnumLineCap,
  QsEnumScaleType,
  qsCreateCanvasPlotted,
  qsCreateCanvasRadial,
  QsEnumColorLightBlues,
} from 'd3qs/d3QuickStart'
import { styled } from '@mui/material/styles'

ace.config.set('basePath', '/node_modules/ace-builds/src-noconflict/')
ace.config.set('workerPath', '/node_modules/ace-builds/src-noconflict/')

export interface ChartEditorProps {
  initialCode: string
}

export const ChartEditor: FunctionComponent<ChartEditorProps> = ({
  initialCode,
}) => {
  // const [code, setCode] = useState(initialCode)
  const [error, setError] = useState('')

  const wrapCode = (code: string): string => {
    return `
    const createChart = () => {
      ${code}
    }
    return createChart()
    `
  }

  const executeJsCode = (code: string) => {
    let jsCode = ''
    try {
      jsCode = transpile(wrapCode(code))
      setError('') // Clear any previous errors
    } catch (error) {
      console.log(error)
      setError('Failed to transpile TypeScript. Please check your code.')
    }
    try {
      // eslint-disable-next-line no-new-func
      const func = new Function(
        'qsCreateCanvasOrthogonal',
        'qsCreateCanvasPlotted',
        'qsCreateCanvasRadial',
        'QsEnumColorScale',
        'QsEnumCurve',
        'QsEnumAlignmentBaseline',
        'QsEnumTextAnchor',
        'QsEnumTextFontWeight',
        'QsEnumTextFontStyle',
        'QsEnumTextDecorationLine',
        'QsEnumTextFont',
        'QsEnumLineJoin',
        'QsEnumLineCap',
        'QsEnumAxisScaleType',
        'QsEnumScaleType',
        'QsEnumColorLightBlues',
        `return (function() { ${jsCode} })()`
      )
      func(
        qsCreateCanvasOrthogonal,
        qsCreateCanvasPlotted,
        qsCreateCanvasRadial,
        QsEnumColorScale,
        QsEnumCurve,
        QsEnumAlignmentBaseline,
        QsEnumTextAnchor,
        QsEnumTextFontWeight,
        QsEnumTextFontStyle,
        QsEnumTextDecorationLine,
        QsEnumTextFont,
        QsEnumLineJoin,
        QsEnumLineCap,
        QsEnumAxisScaleType,
        QsEnumScaleType,
        QsEnumColorLightBlues
      )
    } catch (execError) {
      console.log(execError)
    }
  }

  useEffect(() => {
    executeJsCode(initialCode)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const ChartEditorTheme = styled('div')(({ theme }) => ({
    marginTop: '30px',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  }))

  const AceTheme = styled('div')(({ theme }) => ({
    borderRadius: '10px',
    border: 'solid',
    borderWidth: '10px',
    borderColor: '#282c34',
    flex: '0 0 40%',
    minWidth: 0,
    boxSizing: 'border-box',
    [theme.breakpoints.down('lg')]: {
      paddingLeft: '0px',
      paddingTop: '25px',
    },
  }))

  const EditableChartTheme = styled('div')(({ theme }) => ({
    paddingLeft: '25px',
    paddingTop: '10px',
    flex: '0 0 40%',
    justifyContent: 'flex-start',
    [theme.breakpoints.down('lg')]: {
      paddingLeft: '0px',
      paddingTop: '25px',
    },
  }))

  return (
    <ChartEditorTheme>
      <AceTheme>
        <AceEditor
          mode="javascript"
          theme="monokai"
          value={initialCode}
          onChange={executeJsCode}
          name="editor"
          editorProps={{ $blockScrolling: true }}
          width="100%"
          height="600px"
          setOptions={{
            showGutter: false,
            useWorker: false,
            showLineNumbers: false,
            showPrintMargin: false,
          }}
        />
      </AceTheme>

      {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}
      <EditableChartTheme>
        <div id="ChartEditable" />
      </EditableChartTheme>
    </ChartEditorTheme>
  )
}
