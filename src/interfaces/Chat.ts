import { User } from "./User";

export interface Chat {
  id?: number;
  socket_id?: string;
  fromAccount?: number;
  sender?: User;
  toAccount?: number;
  receiver?: User;
  content?: string;
  createdAt?: string;
}
