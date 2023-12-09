import { Address } from "./Address";
import { Portfolio } from "./Portfolio";

export interface Person {
  id: number;
  phoneNumber?: string;
  avatar?: string;
  nif: string;
  birthday: string;
  address?: Address;
  portfolio?: Portfolio;
}
