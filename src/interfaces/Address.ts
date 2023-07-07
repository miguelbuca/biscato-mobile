import { Work } from "./Work";

export interface Address {
  id?: number;

  lat?: number;

  lng?: number;

  name: string;

  description?: string;

  work?: Work;
}
