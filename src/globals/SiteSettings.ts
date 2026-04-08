import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  admin: {
    group: 'Settings',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Main Logo',
    },
    {
      name: 'logoSecondary',
      type: 'upload',
      relationTo: 'media',
      label: 'Secondary Logo',
      required: true,
    },
    {
      name: 'whatsappNumber',
      type: 'text',
      required: true,
      label: 'Admin WhatsApp Number',
      admin: {
        description: 'Format: 628123456789 (without + or spaces)',
      },
    },
    {
      name: 'googleFormLink',
      type: 'text',
      label: 'Google Form Link',
      admin: {
        description: 'Link to the Google Form for first-time borrowers.',
      },
    },
  ],
}
