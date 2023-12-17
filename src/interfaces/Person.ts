import { Address } from "./Address";
import { Portfolio } from "./Portfolio";
import { User } from "./User";

export interface Person {
  id: number;
  phoneNumber?: string;
  avatar?: string;
  nif: string;
  birthday: string;
  address?: Address;
  portfolio?: Portfolio;
  user?: User
}
