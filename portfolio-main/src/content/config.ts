import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    category: z.enum(['essay', 'technical', 'note']),
    tags: z.array(z.string()).default([]),
    lang: z.enum(['en', 'vi']).default('en'),
    heroImage: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const work = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    domain: z.enum(['devtools', 'ai', 'security']),
    role: z.string(),
    year: z.number(),
    client: z.string().optional(),
    problem: z.string(),
    deliverable: z.string(),
    outcome: z.string(),
    tools: z.array(z.string()).default([]),
    url: z.string().optional(),
    cover: z.string().optional(),
    featured: z.boolean().default(false),
    order: z.number(),
  }),
});

export const collections = { blog, work };
