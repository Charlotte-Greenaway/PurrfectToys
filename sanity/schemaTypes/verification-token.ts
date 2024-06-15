import { defineType } from "sanity";
const generateRandomId = () => {
  return Math.random().toString(36).slice(2, 9);
};
// verification-token - only if you use email provider
export const verificationToken = defineType({
  name: "verification-token",
  title: "Verification Token",
  type: "document",
  fields: [
    {
      name: "identifier",
      title: "Identifier",
      type: "string",
    },
    {
      name: "token",
      title: "Token",
      type: "string",
    },
    {
      name: "expires",
      title: "Expires",
      type: "datetime",
    },
  ],
});

export const userType = defineType({
  name: "user",
  title: "User",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "email",
      title: "Email",
      type: "string",
    },
    {
      name: "image",
      title: "Image",
      type: "url",
    },
    {
      // this is only if you use credentials provider
      name: "password",
      type: "string",
      hidden: true,
    },
    {
      name: "emailVerified",
      type: "datetime",
      hidden: true,
    },
  ],
});


//user for user details relating to type of user contains address email tel  mailing preferences etc
export const userAccount = defineType({
  name: 'userAccount',
  title: 'User Account',
  type: 'document',
  fields: [
    {
      name: 'tel',
      type: 'string'
    },
    {
      name: 'address',
      type: 'string'
    },
    {
      name: 'mailingPreferences',
      type: 'string'
    },
    {
      name: 'user',
      title: 'User',
      type: 'reference',
      to: { type: 'user' }
    }
  ]
})

export const order = defineType({
  name: 'order',
  title: 'Order',
  type: 'document',
  fields: [
    {
      name: 'orderNumber',
      type: 'string',
      initialValue: generateRandomId,
      readOnly: true,
      validation: Rule => Rule.required()
    },
    {
      name: 'orderDate',
      type: 'datetime'
    },
    {
      name: 'orderTotal',
      type: 'number'
    },
    {
      name: 'orderItems',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'item',
            type: 'reference',
            to: { type: 'shopItems' }
          },
          {
            name: 'count',
            type: 'number',
            validation: Rule => Rule.required().min(1)
          }
        ]
      }]
    },
    {
      name: 'userAccount',
      type: 'reference',
      to: { type: 'userAccount' }
    }
  ]
})