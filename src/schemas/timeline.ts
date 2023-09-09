//* Library Imports
import z from "zod";

export const genericTimelineObjectSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  image: z.string().nullable(),
  description: z.string(),
  start: z.number(),
  end: z.number(),
});

export type GenericTimelineObject = z.infer<typeof genericTimelineObjectSchema>;

export const timelineItemSchema = genericTimelineObjectSchema;

export type TimelineItem = z.infer<typeof timelineItemSchema>;

export const timelineEventSchema = genericTimelineObjectSchema;

export type TimelineEvent = z.infer<typeof timelineEventSchema>;

export const timelinePlaceSchema = genericTimelineObjectSchema;

export type TimelinePlace = z.infer<typeof timelinePlaceSchema>;

export const timelineCharacterSchema = genericTimelineObjectSchema;

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
