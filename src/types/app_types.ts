//define types for use in the application
import { Sizes } from "./strapi";

export type AllContentTypes = "groups" | "singles" | "novels";

export type Categories = "illustration" | "comic";

//for redux state to store nav links
export interface TabObject {
  tabName: string;
  type: AllContentTypes;
}

//standardized image type for use across the app
export interface Image extends SinglePage {
  altText: string;
  caption: string | null;
  etsyUrl: string | null;
  size: keyof Urls;
}

//standardized page data type for use across the app
export interface Details {
  title?: string | null;
  longDescription?: string | null;
}

export interface SinglePage {
  urls: Urls;
}

export type Urls = Sizes<string>;
