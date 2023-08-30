import {
  PageDataComponent,
  ImageComponent,
  ApiStrapiCollection,
  AttributeSchema,
} from "./";
/**
 * Model definition for Group
 */
export interface GroupType extends AttributeSchema {
  id: string;
  pageData: PageDataComponent;
  images: ImageComponent[];
  tabName: string;
  layout: "singleRow" | "doubleRow";
  titleSide: "left" | "right";
}

export type ApiGroupCollection = ApiStrapiCollection<GroupType>;

/*
Group {
  data: {
    id;
    attributes: {
      ...AttributeSchema,
      GroupType
    }
  }[]
  ...StrapiTypeSchema
}

*/
