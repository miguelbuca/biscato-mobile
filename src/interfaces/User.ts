import { Person } from "./Person";

export interface User {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  persons?: Person[];
}
