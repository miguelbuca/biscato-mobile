export interface Notification {
  id?: number
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

  title?: string;

  content?: string;

  extra?: object;
}
