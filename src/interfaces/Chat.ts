import { User } from "./User";

export interface Chat {
  id?: string;
  socket_id?: string;
  fromAccount?: string;
  sender?: User;
  toAccount?: string;
  receiver?: User;
  content?: string;
  createdAt?: string;
}
