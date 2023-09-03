//* Library Imports
import z from "zod";

export const timelineItemSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  image: z.string().nullable(),
  description: z.string(),
  start: z.number(),
  end: z.number(),
});

export type TimelineItem = z.infer<typeof timelineItemSchema>;

export const timelineEventSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  image: z.string().nullable(),
  description: z.string(),
  start: z.number(),
  end: z.number(),
});

export type TimelineEvent = z.infer<typeof timelineEventSchema>;

export const timelinePlaceSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  image: z.string().nullable(),
  description: z.string(),
  start: z.number(),
  end: z.number(),
});

export type TimelinePlace = z.infer<typeof timelinePlaceSchema>;

export const timelineCharacterSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  image: z.string().nullable(),
  description: z.string(),
  start: z.number(),
  end: z.number(),
});

export type TimelineCharacter = z.infer<typeof timelineCharacterSchema>;

export const timelineSchema = z.object({
  items: z.array(timelineItemSchema),
  events: z.array(timelineEventSchema),
  places: z.array(timelinePlaceSchema),
  characters: z.array(timelineCharacterSchema),
});

export type Timeline = z.infer<typeof timelineSchema>;

export const updateTimelineSchema = z.object({
  pageId: z.string().uuid(),
  timeline: timelineSchema,
});

export type UpdateTimeline = z.infer<typeof updateTimelineSchema>;
