//* Type imports
import type { World } from "@prisma/client";

export function parseWorlds(worlds: World[]) {
  const updatedWorlds = worlds.map((item) => {
    return {
      ...item,
      start: Number(item.start.toString()),
      end: Number(item.end.toString()),
    };
  });
  return updatedWorlds;
}

export function parseWorld(world: World) {
  const updatedWorld = {
    ...world,
    start: Number(world.start.toString()),
    end: Number(world.end.toString()),
  };
  return updatedWorld;
}