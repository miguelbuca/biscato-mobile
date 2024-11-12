import { Person } from "./Person";

export interface User {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  Person?: Person;
}
