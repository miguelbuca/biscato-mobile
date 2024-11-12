import { Work } from "./Work";

export interface Address {
  id?: string;

  lat?: number;

  lng?: number;

  name: string;

  description?: string;

  work?: Work;
}
