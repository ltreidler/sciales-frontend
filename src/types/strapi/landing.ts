import { AttributeSchema, ApiStrapiType, ImageComponent } from "./";

/**
 * Model definition for Landing
 */

export interface LandingType extends AttributeSchema {
  image: ImageComponent;
}

export type ApiLandingPage = ApiStrapiType<LandingType>;
