import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const announcements = sqliteTable("announcements", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  date: text("date").notNull(),
  content: text("content").notNull(),
  isPublished: integer("is_published").notNull().default(1),
  createdAt: integer("created_at").notNull().default(Date.now()),
});

export const blogPosts = sqliteTable("blog_posts", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  date: text("date").notNull(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  coverImage: text("cover_image").notNull(),
  galleryImages: text("gallery_images").notNull().default("[]"),
  isPublished: integer("is_published").notNull().default(1),
  createdAt: integer("created_at").notNull().default(Date.now()),
});

export const siteSettings = sqliteTable("site_settings", {
  key: text("key").primaryKey(),
  value: text("value").notNull(),
});

export type Announcement = typeof announcements.$inferSelect;
export type NewAnnouncement = typeof announcements.$inferInsert;
export type BlogPost = typeof blogPosts.$inferSelect;
export type NewBlogPost = typeof blogPosts.$inferInsert;
export type SiteSetting = typeof siteSettings.$inferSelect;
