import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({
    pattern: '**/[^_]*.{md,mdx}',
    base: './src/content/projects',
  }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    repository: z.url(),
    language: z.string(),
    status: z.enum(['active', 'maintenance', 'reference']),
    statusLabel: z.string(),
    technologies: z.array(z.string()).min(1),
    order: z.number().int().nonnegative(),
    featured: z.boolean().default(false),
  }),
});

const writing = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/writing' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    draft: z.boolean().default(false),
    topics: z.array(z.string()).default([]),
  }),
});

export const collections = { projects, writing };
