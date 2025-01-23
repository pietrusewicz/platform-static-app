import type { Item } from "./item";

export interface Parchment extends Item {
  title?: string;
  description?: string;
  id?: uuid;
}
