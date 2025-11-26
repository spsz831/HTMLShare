'use client'

import { useEffect, useRef } from 'react'

interface MermaidRendererProps {
  chart: string
  className?: string
  theme?: 'default' | 'dark' | 'forest' | 'neutral'
}

const MermaidRenderer = ({ chart, className = '', theme = 'default' }: MermaidRendererProps) => {
  const mermaidRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const renderMermaid = async () => {
      try {
        const mermaid = await import('mermaid')

        mermaid.default.initialize({
          startOnLoad: false,
          theme,
          securityLevel: 'loose',
        })

        if (mermaidRef.current) {
          const element = mermaidRef.current
          element.innerHTML = chart
          await mermaid.default.run({
            nodes: [element],
          })
        }
      } catch (error) {
        console.error('Mermaid rendering failed:', error)
        if (mermaidRef.current) {
          mermaidRef.current.innerHTML = `
            <div class="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p class="text-red-600 text-sm">图表渲染失败</p>
              <pre class="text-xs text-gray-600 mt-2">${chart}</pre>
            </div>
          `
        }
      }
    }

    renderMermaid()
  }, [chart, theme])

  return (
    <div className={`mermaid-container ${className}`}>
      <div ref={mermaidRef} className="mermaid" />
    </div>
  )
}

export default MermaidRenderer