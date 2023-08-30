import type { Schema, Attribute } from '@strapi/strapi';

export interface BioEvent extends Schema.Component {
  collectionName: 'components_bio_events';
  info: {
    displayName: 'Event';
    icon: 'calendar';
    description: '';
  };
  attributes: {
    eventName: Attribute.String & Attribute.Required;
    date: Attribute.Date & Attribute.Required;
    location: Attribute.String & Attribute.Required;
    description: Attribute.Text & Attribute.Required;
  };
}

export interface MediaImage extends Schema.Component {
  collectionName: 'components_media_images';
  info: {
    displayName: 'Image';
    icon: 'eye';
    description: '';
  };
  attributes: {
    altText: Attribute.String & Attribute.Required;
    caption: Attribute.String;
    etsyUrl: Attribute.String;
    upload: Attribute.Media & Attribute.Required;
  };
}

export interface WorkPageData extends Schema.Component {
  collectionName: 'components_page_page_data';
  info: {
    displayName: 'Page Data';
    icon: 'database';
    description: '';
  };
  attributes: {
    longDescription: Attribute.Text;
    title: Attribute.String;
    category: Attribute.Enumeration<['illustration', 'comic']> &
      Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Shared {
    export interface Components {
      'bio.event': BioEvent;
      'media.image': MediaImage;
      'work.page-data': WorkPageData;
    }
  }
}
