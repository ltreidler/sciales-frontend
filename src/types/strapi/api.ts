export interface AttributeSchema {
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  createdBy: string;
  updatedBy: string;
}

export interface StrapiTypeSchema {
  collectionName: string;
  info: {
    singularName: string;
    pluralName: string;
    displayName: string;
    description: string;
  };
  options: {
    draftAndPublish: boolean;
  };
}

export interface ApiStrapiType<PageType extends AttributeSchema>
  extends StrapiTypeSchema {
  data: {
    id: number;
    attributes: PageType;
  };
}

interface CollectionData<Attributes> {
  id: number;
  attributes: Attributes;
}

export interface ApiStrapiCollection<PageType extends AttributeSchema>
  extends StrapiTypeSchema {
  data: CollectionData<PageType>[];
}