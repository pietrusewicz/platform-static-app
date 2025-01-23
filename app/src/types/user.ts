import type { Item } from "./item";

export interface User extends Item {
  firstName?: string;
  lastName?: string;
  name?: string;
}
