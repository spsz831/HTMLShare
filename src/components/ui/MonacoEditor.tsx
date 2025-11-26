'use client'

import React, { useRef } from 'react'
import Editor, { Monaco, OnChange, OnMount } from '@monaco-editor/react'
import { editor } from 'monaco-editor'

interface MonacoEditorProps {
  value: string
  language: string
  onChange: OnChange
  theme?: 'vs-dark' | 'vs-light'
  height?: string
  className?: string
  options?: editor.IStandaloneEditorConstructionOptions
  readOnly?: boolean
}

const MonacoEditor: React.FC<MonacoEditorProps> = ({
  value,
  language,
  onChange,
  theme = 'vs-dark',
  height = '400px',
  className = '',
  options = {},
  readOnly = false
}) => {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null)

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor

    // 配置Monaco编辑器主题
    monaco.editor.defineTheme('htmlshare-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '6A9955' },
        { token: 'keyword', foreground: 'C586C0' },
        { token: 'string', foreground: 'CE9178' },
        { token: 'number', foreground: 'B5CEA8' },
        { token: 'variable', foreground: '9CDCFE' },
        { token: 'function', foreground: 'DCDCAA' },
        { token: 'type', foreground: '4EC9B0' },
      ],
      colors: {
        'editor.background': '#0f172a',
        'editor.foreground': '#e2e8f0',
        'editor.lineHighlightBackground': '#1e293b',
        'editorLineNumber.foreground': '#64748b',
        'editorIndentGuide.background': '#334155',
        'editorIndentGuide.activeBackground': '#475569',
        'editor.selectionBackground': '#3730a350',
        'editor.inactiveSelectionBackground': '#3730a330',
      }
    })

    monaco.editor.defineTheme('htmlshare-light', {
      base: 'vs',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '008000' },
        { token: 'keyword', foreground: '0000ff' },
        { token: 'string', foreground: 'a31515' },
        { token: 'number', foreground: '098658' },
        { token: 'variable', foreground: '001080' },
        { token: 'function', foreground: '795E26' },
        { token: 'type', foreground: '267f99' },
      ],
      colors: {
        'editor.background': '#ffffff',
        'editor.foreground': '#1e293b',
        'editor.lineHighlightBackground': '#f8fafc',
        'editorLineNumber.foreground': '#64748b',
        'editorIndentGuide.background': '#e2e8f0',
        'editorIndentGuide.activeBackground': '#cbd5e1',
        'editor.selectionBackground': '#3b82f650',
        'editor.inactiveSelectionBackground': '#3b82f630',
      }
    })

    // 注册语言配置
    registerLanguageConfigurations(monaco)

    // 设置错误诊断
    monaco.languages.registerHoverProvider(language, {
      provideHover: (model: any, position: any) => {
        return {
          range: new monaco.Range(1, 1, model.getLineCount(), model.getLineMaxColumn(model.getLineCount())),
          contents: [
            { value: '**HTMLShare Editor**' },
            { value: 'Professional code editor with syntax highlighting' }
          ]
        }
      }
    })
  }

  const defaultOptions: editor.IStandaloneEditorConstructionOptions = {
    selectOnLineNumbers: true,
    roundedSelection: false,
    readOnly: readOnly,
    cursorStyle: 'line',
    automaticLayout: true,
    minimap: { enabled: true },
    scrollBeyondLastLine: false,
    fontSize: 14,
    lineHeight: 21,
    fontFamily: '"Fira Code", "JetBrains Mono", "Monaco", "Menlo", "Ubuntu Mono", monospace',
    fontLigatures: true,
    wordWrap: 'on',
    wrappingIndent: 'indent',
    lineNumbers: 'on',
    glyphMargin: true,
    folding: true,
    showFoldingControls: 'always',
    bracketPairColorization: { enabled: true },
    guides: {
      bracketPairs: true,
      indentation: true,
    },
    suggestOnTriggerCharacters: true,
    acceptSuggestionOnEnter: 'on',
    tabCompletion: 'on',
    quickSuggestions: {
      other: true,
      comments: true,
      strings: true
    },
    ...options
  }

  return (
    <div className={`relative overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 ${className}`}>
      <Editor
        height={height}
        language={language}
        value={value}
        theme={theme === 'vs-dark' ? 'htmlshare-dark' : 'htmlshare-light'}
        onChange={onChange}
        onMount={handleEditorDidMount}
        options={defaultOptions}
        loading={
          <div className="flex items-center justify-center h-full bg-white dark:bg-slate-900 text-gray-600 dark:text-gray-400">
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
              <span>Loading Editor...</span>
            </div>
          </div>
        }
      />
    </div>
  )
}

// 注册自定义语言配置
const registerLanguageConfigurations = (monaco: Monaco) => {
  // HTML语言增强
  monaco.languages.setLanguageConfiguration('html', {
    wordPattern: /[\w-]+/g,
    comments: {
      blockComment: ['<!--', '-->']
    },
    brackets: [
      ['<!--', '-->'],
      ['<', '>'],
      ['{', '}'],
      ['(', ')']
    ],
    autoClosingPairs: [
      { open: '{', close: '}' },
      { open: '[', close: ']' },
      { open: '(', close: ')' },
      { open: '"', close: '"' },
      { open: "'", close: "'" },
      { open: '<', close: '>' }
    ],
    surroundingPairs: [
      { open: '"', close: '"' },
      { open: "'", close: "'" },
      { open: '{', close: '}' },
      { open: '[', close: ']' },
      { open: '(', close: ')' },
      { open: '<', close: '>' }
    ],
    folding: {
      markers: {
        start: new RegExp("^\\s*<!--\\s*#region\\b.*-->"),
        end: new RegExp("^\\s*<!--\\s*#endregion\\b.*-->")
      }
    }
  })

  // CSS语言增强
  monaco.languages.setLanguageConfiguration('css', {
    wordPattern: /-?#?\d*\.?\d+(?:%|[a-z]+)?|[\w-]+/g,
    comments: {
      blockComment: ['/*', '*/']
    },
    brackets: [
      ['{', '}'],
      ['[', ']'],
      ['(', ')']
    ],
    autoClosingPairs: [
      { open: '{', close: '}', notIn: ['string', 'comment'] },
      { open: '[', close: ']' },
      { open: '(', close: ')' },
      { open: '"', close: '"', notIn: ['string'] },
      { open: "'", close: "'", notIn: ['string'] }
    ]
  })

  // JavaScript/TypeScript增强
  const jsConfig = {
    wordPattern: /(-?\d*\.\d\w*)|([^\`\~\!\@\#\%\^\&\*\(\)\-\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\?\s]+)/g,
    comments: {
      lineComment: '//',
      blockComment: ['/*', '*/']
    },
    brackets: [
      ['{', '}'],
      ['[', ']'],
      ['(', ')']
    ],
    autoClosingPairs: [
      { open: '{', close: '}' },
      { open: '[', close: ']' },
      { open: '(', close: ')' },
      { open: '"', close: '"', notIn: ['string'] },
      { open: "'", close: "'", notIn: ['string'] },
      { open: '`', close: '`', notIn: ['string', 'comment'] }
    ]
  }

  monaco.languages.setLanguageConfiguration('javascript', jsConfig)
  monaco.languages.setLanguageConfiguration('typescript', jsConfig)
}

export default MonacoEditor