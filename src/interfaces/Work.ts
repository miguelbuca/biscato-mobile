import { Address } from "./Address";
import { Contract } from "./Contract";
import { SkillType } from "./SkillType";
import { User } from "./User";

export interface Work {
  id?: number;

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

  skillType?: SkillType;

  status?: StatusType;
}
