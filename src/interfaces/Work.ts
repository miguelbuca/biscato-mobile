import { Address } from "./Address";

export interface Work {
  title?: string;

  costPerHour?: number;

  description?: string;

  totalTime?: number;

  time?: "HOUR" | "DAY" | "WEEK" | "MONTH" | "YEAR";

  term?: string;

  address?: Address;

  skillTypeId?: number | string;
}
