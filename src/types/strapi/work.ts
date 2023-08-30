import {
  PageDataComponent,
  ImageComponent,
  ApiStrapiCollection,
  AttributeSchema,
  MultiUpload,
} from "./";

export type PageTypes = SingleType | GroupType | NovelType;

export type AllWorkTypes = WorkPages<PageTypes[]>;
export type SinglePageType = WorkPages<SingleType[]>;
export type GroupPageType = WorkPages<GroupType[]>;
export type NovelPageType = WorkPages<NovelType[]>;

export interface WorkPages<PageMedia> extends AttributeSchema {
  tabName: string;
  pageData: PageDataComponent;
  pageMedia: PageMedia;
}

interface MediaComponent {
  __component: "media.single" | "media.group" | "media.novel";
}

export interface SingleType extends MediaComponent {
  image: ImageComponent;
}

export interface GroupType extends MediaComponent {
  images: ImageComponent[];
  layout: "singleRow" | "doubleRow";
  titleSide: "left" | "right" | "center";
}

export interface NovelType extends MediaComponent {
  coverPage: ImageComponent;
  pages: MultiUpload;
}

export type ApiWorkCollection = ApiStrapiCollection<AllWorkTypes>;
