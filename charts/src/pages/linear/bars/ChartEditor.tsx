import React, { FunctionComponent, useEffect, useState } from 'react'
import AceEditor from 'react-ace'
import 'ace-builds/src-noconflict/mode-javascript'
import 'ace-builds/src-noconflict/theme-monokai'
import 'ace-builds/src-noconflict/worker-javascript'
import ace from 'ace-builds'
import { transpile } from 'typescript'
import { qsCreateCanvas } from 'd3qs/d3QuickStart'
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
        'qsCreateCanvas',
        `return (function() { ${jsCode} })()`
      )
      func(qsCreateCanvas)
    } catch (execError) {
      console.log(execError)
    }
  }

  useEffect(() => {
    executeJsCode(initialCode)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const ChartEditorTheme = styled('div')(({ theme }) => ({
    '.chartEditor': {
      marginTop: '30px',
      display: 'flex',
      flexDirection: 'row',
    },
  }))

  const EditableChartTheme = styled('div')(({ theme }) => ({
    paddingLeft: '100px',
    flexDirection: 'row',
  }))

  return (
    <ChartEditorTheme>
      {/* <Button onClick={executeJsCode}>Update Chart</Button> */}
      <div className={'chartEditor'}>
        <AceEditor
          mode="javascript"
          theme="monokai"
          value={initialCode}
          onChange={executeJsCode}
          name="editor"
          editorProps={{ $blockScrolling: true }}
          width="50%"
          height="800px"
          setOptions={{ showGutter: false, useWorker: false }}
        />

        {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}
        <EditableChartTheme>
          <div id="ChartEditable" />
        </EditableChartTheme>
      </div>
    </ChartEditorTheme>
  )
}
