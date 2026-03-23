import { convertLexicalNodesToJSX, defaultJSXConverters } from '@payloadcms/richtext-lexical/react'
import React from 'react'

export const RichText = ({ data, className }: { data: any; className?: string }) => {
  if (!data || typeof data !== 'object' || !data.root) return null

  const content = convertLexicalNodesToJSX({
    converters: defaultJSXConverters,
    nodes: data.root.children,
    parent: data.root as any,
  })

  if (!className) {
    return <>{content}</>
  }

  return <div className={className}>{content}</div>
}
