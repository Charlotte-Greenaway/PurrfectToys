//sanity config for a items
import { defineField, defineType } from "sanity";

const generateRandomId = () => {
  return Math.random().toString(36).slice(2, 9);
};

export const shopItem = defineType({
  name: "shopItems",
  title: "Shop Items",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "number",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    //randomly generate product id
    defineField({
      name: "productId",
      title: "Product ID",
      type: "string",
      initialValue: generateRandomId,
      readOnly: true,
    }),
    defineField({
      name: "sections",
      title: "Sections",
      type: "array",
      of: [{ type: "reference", to: [{ type: "shopSections" }] }],
      validation: (Rule) => Rule.required().min(1).unique(),
    }),
    defineField({
      name: "stock",
      title: "Stock",
      type: "number",
      validation: (Rule) => Rule.required(),
    }),
  ],
});


export const shopSection = defineType({
  name: "shopSections",
  title: "Shop Sections",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
  ],
});