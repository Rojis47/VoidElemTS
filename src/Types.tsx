import * as z from "zod";

const UserSchema = z.object({
  id: z.number(),
  username: z.string(),
  password: z.string(),
  email: z.string(),
});

export type User = z.infer<typeof UserSchema>;

const ProjectSchema = z.object({
  id: z.number(),
  userId: z.number(),
  name: z.string(),
  description: z.string(),
  html: z.string(),
  css: z.string(),
  js: z.string(),
});

export type Project = z.infer<typeof ProjectSchema>;
