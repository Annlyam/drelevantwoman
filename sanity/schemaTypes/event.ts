import { defineField, defineType } from 'sanity'

export const eventSchema = defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL ID)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Upcoming', value: 'upcoming' },
          { title: 'Past', value: 'past' },
          { title: 'Cancelled', value: 'cancelled' },
        ],
        layout: 'radio',
      },
      initialValue: 'upcoming',
    }),
    defineField({
      name: 'date',
      title: 'Event Date & Start Time',
      description: 'Date and start time of the event.',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'endTime',
      title: 'End Time (HH:MM)',
      description: 'End time in 24-hour format, e.g. 17:00',
      type: 'string',
    }),
    defineField({
      name: 'venue',
      title: 'Venue / Platform',
      description: 'e.g. Zoom Webinar, Lagos Conference Center, Virtual (Online)',
      type: 'string',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      description: 'City and country, e.g. Lagos, Nigeria or Virtual Event',
      type: 'string',
    }),
    defineField({
      name: 'zoomLink',
      title: 'Zoom / Meeting Link',
      description: 'The full Zoom or Google Meet URL for virtual events. This will be included in the registration confirmation email.',
      type: 'url',
    }),
    defineField({
      name: 'price',
      title: 'Price',
      description: 'Set to 0 for free events.',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'currency',
      title: 'Currency Symbol',
      description: 'e.g. ₦ or $',
      type: 'string',
      initialValue: '₦',
    }),
    defineField({
      name: 'capacity',
      title: 'Capacity',
      type: 'number',
    }),
    defineField({
      name: 'registeredCount',
      title: 'Registered Count',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'registrationEndDate',
      title: 'Registration End Date',
      type: 'date',
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured on Homepage?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'hidden',
      title: 'Hidden?',
      description: 'Hide this event from all listings.',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          'Conference',
          'Webinar',
          'Workshop',
          'Meetup',
          'Education & Training',
          'Finance & Empowerment',
          'Leadership',
          'Other',
        ],
      },
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'image',
      title: 'Event Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      description: 'Supports rich text (HTML allowed in body).',
      type: 'text',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'date',
      media: 'image',
    },
  },
})

