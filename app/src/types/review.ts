import type { Item } from "./item";

export interface Review extends Item {
  user?: any;
  book?: any;
  publishedAt?: string;
  body?: string;
  rating?: number;
  letter?: string;
}
