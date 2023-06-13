import { User } from "./User";
import { Work } from "./Work";

export interface Contract {
  id: number;

  workId?: number;
  work?: Work;

  hiredId?: number;
  hired?: User;
}
