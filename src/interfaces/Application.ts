import { User } from "./User";
import { Work } from "./Work";

export interface Application {
  status?:
    | "ACTIVE"
    | "INACTIVE"
    | "AWAY"
    | "AVAILABLE"
    | "BUSY"
    | "OFFLINE"
    | "ONLINE"
    | "ON_HOLD"
    | "IN_PROGRESS"
    | "COMPLETED"
    | "PENDING"
    | "PAUSED"
    | "UNDECIDED"
    | "IN_PROCESS"
    | "UNDER_REVIEW"
    | "CANCELED"
    | "BLOCKED"
    | "RELEASED"
    | "UNDER_MAINTENANCE";
  id?: number;
  user?: User;

  workId: number;
  work?: Work;
}
