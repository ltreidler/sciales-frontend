/**
 * Model definition for strapi components:
 * PageData and ImageComponent (which includes media upload data)
 */

//Component schema
interface ComponentSchema<T> {
  collectionName: string;
  info: {
    displayName: string;
    icon: string;
    description: string;
    attributes: T;
  };
}

//Page data component types:
export type ApiPageData = ComponentSchema<PageDataComponent>;

export type PageCategory = "comics" | "illustrations";

export interface PageDataComponent {
  category: string;
  id: number;
  longDescription: string | null;
  title: string | null;
}

//Image and media component types:

interface Url {
  url: string;
}

export interface Sizes<Type> {
  large: Type;
  small: Type;
  medium: Type;
  thumbnail: Type;
}

export interface SingleUpload {
  attributes: {
    formats: Sizes<Url>;
  };
}

export interface UploadType<T> {
  data: T;
}

export type Upload = UploadType<SingleUpload>;

export type MultiUpload = UploadType<SingleUpload[]>;

export interface ImageComponent {
  altText: string;
  caption: string | null;
  etsyUrl: string | null;
  id: number;
  upload: Upload;
  size: keyof Sizes<Url>;
}

export type ApiImageComponent = ComponentSchema<ImageComponent>;
