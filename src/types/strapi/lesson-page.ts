import { ImageComponent, AttributeSchema, ApiStrapiType } from "./";

/**
 * Model definition for Lesson Page
 */
export interface LessonPageType extends AttributeSchema {
  description: string;
  successMessage: string;
  image: ImageComponent;
}

export type ApiLessonPage = ApiStrapiType<LessonPageType>;

/*
ApiLessonPage {
  ...SingleTypeSchema,
  data: {
    id,
    attributes: {
      description,
      successMessage,
      image: ImageComponent,
      ...AttributeSchema
    }
  }
}
*/
