import React, { FunctionComponent, useState } from 'react'
import AceEditor from 'react-ace'
import 'ace-builds/src-noconflict/mode-javascript'
import 'ace-builds/src-noconflict/theme-monokai'
import 'ace-builds/src-noconflict/worker-javascript'
import ace from 'ace-builds'
import { transpile } from 'typescript'
import { qsCreateCanvas } from 'd3qs/d3QuickStart'
import { Button } from '@mui/material'
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

  const ChartEditorTheme = styled('div')(({ theme }) => ({
    '.chartEditor': {
      display: 'flex',
      flexDirection: 'row',
      '&: hover': {
        borderColor: '#39d615',
        boxShadow: '0px 0px 10px #39d615',
      },
    },
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
        <div id="ChartEditable" />
      </div>
    </ChartEditorTheme>
  )
}
