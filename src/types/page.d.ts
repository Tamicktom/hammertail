export type PageTypes = "characters" | "places" | "items" | "events" | "undefined";

export type Character = {
  name: string;
  description: string;
  birthYear: number;
  deathYear: number;
  other: json;
};

export type Place = {
  name: string;
  description: string;
  birthYear: number;
  deathYear: number;
  other: json;
};

export type Item = {
  name: string;
  description: string;
  birthYear: number;
  deathYear: number;
  other: json;
};

export type Event = {
  name: string;
  description: string;
  birthYear: number;
  deathYear: number;
  other: json;
};