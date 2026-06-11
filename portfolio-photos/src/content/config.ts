import { defineCollection, z } from 'astro:content';

const photos = defineCollection({
  type: 'data',
  schema: z.object({
    src: z.string(), // path relative to /public, e.g. "/photos/my-photo.jpg"
      alt: z.string(),
      caption: z.string().optional(),
      location: z.string().optional(),
      date: z.coerce.date(),
      series: z.string().optional(),
      featured: z.boolean().default(false),
      order: z.number().optional(),
    }),
});

export const collections = { photos };
