import type { Item } from "./item";

export interface Book extends Item {
  book?: any;
  title?: string;
  author?: string;
  null;
  condition?: string;
  rating?: integer;
  null;
}
