import { Address } from "./Address";
import { Contract } from "./Contract";
import { User } from "./User";

export interface Work {
  title?: string;

  costPerHour?: number;

  description?: string;

  totalTime?: number;

  time?: "HOUR" | "DAY" | "WEEK" | "MONTH" | "YEAR";

  term?: string;

  address?: Address;

  skillTypeId?: number | string;

  contract?: Contract;

  user?: User;
}
