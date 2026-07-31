export default {
  name: "campaignEmail",
  title: "Campaign Emails",
  type: "document",
  fields: [
    {
      name: "subject",
      title: "Email Subject",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Draft", value: "draft" },
          { title: "Ready to Send", value: "ready" },
          { title: "Sent", value: "sent" },
        ],
        layout: "radio",
      },
      initialValue: "draft",
    },
    {
      name: "body",
      title: "Email Body",
      description: "The content of the email campaign.",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "sentAt",
      title: "Sent At",
      type: "datetime",
      readOnly: true,
      description: "Automatically populated when the email is sent.",
    },
  ],
  preview: {
    select: {
      title: "subject",
      subtitle: "status",
    },
  },
};
