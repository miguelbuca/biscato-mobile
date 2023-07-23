import { Address } from "./Address";

export interface Person {
  phoneNumber?: string;
  avatar?: string;
  nif: string;
  birthday: string;
  address?: Address;
}
