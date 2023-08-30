import { AttributeSchema, ApiStrapiType } from "./";
/**
 * Model definition for Bio Page
 */
export interface BioPageType extends AttributeSchema {
  id: string;
  artistStatement: string;
  events: Event[];
}

export interface Event {
  id: number;
  eventName: string;
  date: string;
  location: string;
  description: string;
  link?: string;
}

export type ApiBioPage = ApiStrapiType<BioPageType>;

/*
ApiBioPage {
  ...SingleTypeSchema,
  data: {
    id,
    attributes: {
      id: string;
      artistStatement?: string;
      events: any[];
      ...AttributeSchema
    }
  }
}
*/
