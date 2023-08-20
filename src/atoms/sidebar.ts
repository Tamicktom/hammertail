//* Libraries imports
import { atom, useAtomValue } from "jotai";

export function getSidebarState() {
  if (typeof window === "undefined") return false;
  const sidebarState = localStorage.getItem("sidebarState");
  return sidebarState === "true" ? true : false;
}

export function setSidebarState(state: boolean) {
  if (typeof window === "undefined") return;
  localStorage.setItem("sidebarState", state ? "true" : "false");
}

export const sidebarCollapseAtom = atom<boolean>(getSidebarState());
