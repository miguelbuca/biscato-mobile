import { Person } from "./Person";
import { PortfolioItem } from "./PortfolioItem";

export class Portfolio {
  id?: number;

  title?: string;

  biography?: string;

  items?: PortfolioItem[];

  personId?: string;

  person?: Person
}
