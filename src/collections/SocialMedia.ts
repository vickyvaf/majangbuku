import type { CollectionConfig } from 'payload'

export const SocialMedia: CollectionConfig = {
  slug: 'social-media',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'url', 'active', 'order'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Platform Name (e.g. Instagram, Facebook)',
    },
    {
      name: 'url',
      type: 'text',
      required: true,
      label: 'Social Media URL',
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 1,
      admin: {
        description: 'Position in the sidebar (lower number comes first)',
      },
    },
    {
      name: 'active',
      type: 'checkbox',
      defaultValue: true,
      label: 'Visible on website',
    },
    {
      name: 'icon',
      type: 'select',
      options: [
        { label: 'Instagram', value: 'instagram' },
        { label: 'Facebook', value: 'facebook' },
        { label: 'X (formerly Twitter)', value: 'twitter' },
        { label: 'YouTube', value: 'youtube' },
        { label: 'TikTok', value: 'tiktok' },
        { label: 'Threads', value: 'threads' },
        { label: 'WhatsApp', value: 'whatsapp' },
        { label: 'Telegram', value: 'telegram' },
        { label: 'Generic Link', value: 'link' },
      ],
      admin: {
        description: 'Select an icon or platform style',
      },
    },
  ],
}
