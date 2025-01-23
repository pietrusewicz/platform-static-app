import type { Item } from "./item";

export interface Book extends Item {
  book?: any;
  title?: string;
  author?: string;
  condition?: string;
  rating?: number;
}
