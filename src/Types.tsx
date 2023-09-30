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
  javascript: z.string(),
});

export type Project = z.infer<typeof ProjectSchema>;

const FavoriteSchema = z.object({
  userId: z.number(),
  projectId: z.number(),
});

export type Favorite = z.infer<typeof FavoriteSchema>;

const ActiveSelectorSchema = z.union([
  z.literal("home"),
  z.literal("myVoidElements"),
  z.literal("exploreVoidElements"),
  z.literal("favorites"),
  z.literal("create"),
  z.literal("user"),
]);

export type TActiveSelector = z.infer<typeof ActiveSelectorSchema>;
