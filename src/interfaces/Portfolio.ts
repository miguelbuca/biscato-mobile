import { Person } from "./Person";
import { PortfolioItem } from "./PortfolioItem";

export class Portfolio {
  id?: string;

  title?: string;

  biography?: string;

  items?: PortfolioItem[];

  personId?: string;

  person?: Person
}
