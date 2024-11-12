import { User } from "./User";
import { Work } from "./Work";

export interface Contract {
  id: string;

  workId?: string;
  work?: Work;

  hiredId?: string;
  hired?: User;
}
