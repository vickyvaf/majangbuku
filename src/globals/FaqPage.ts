import { GlobalConfig } from 'payload'

export const FaqPage: GlobalConfig = {
  slug: 'faq-page',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'FAQ',
    },
    {
      name: 'subtitle',
      type: 'text',
      required: false,
      defaultValue: 'Find your answers for the most asked questions',
    },
  ],
}
