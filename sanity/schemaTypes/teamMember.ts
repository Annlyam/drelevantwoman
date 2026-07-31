import { defineField, defineType } from 'sanity'

export const teamMemberSchema = defineType({
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'text',
    }),
    defineField({
      name: 'featured',
      title: 'Featured (e.g. Founder)',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'hierarchy',
      title: 'Hierarchy Level',
      type: 'number',
      description: '1 = Founder, 2 = Board, 3 = Mentors/Managers, 4 = Staff, etc.',
      initialValue: 4,
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'object',
      fields: [
        { name: 'linkedin', type: 'url', title: 'LinkedIn URL' },
        { name: 'instagram', type: 'url', title: 'Instagram URL' },
        { name: 'twitter', type: 'url', title: 'Twitter URL' },
      ],
    }),
  ],
})
