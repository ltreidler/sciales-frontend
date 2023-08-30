/**
 * Model definition for Logo
 */
import { Upload, AttributeSchema, ApiStrapiType } from "./";

export interface LogoType extends AttributeSchema {
  logo: Upload;
}

export type ApiLogo = ApiStrapiType<LogoType>;

/*
ApiLogo {
  ...SingleTypeSchema
  data: {
    id,
    attributes: {
      logo: Upload
      ...AttributeSchema
    }
  }
}
*/
