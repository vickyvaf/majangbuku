import { RichText as PayloadRichText } from '@payloadcms/richtext-lexical/react'
import React from 'react'

export const RichText = ({ data, className }: { data: any; className?: string }) => {
  if (!data || typeof data !== 'object' || !data.root) return null

  return (
    <div className={className}>
      <PayloadRichText data={data} />
    </div>
  )
}
