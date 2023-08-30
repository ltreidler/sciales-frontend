import {
  ImageComponent,
  PageDataComponent,
  MultiUpload,
  Urls,
} from "../../types";

export const parseImage = (imageData: ImageComponent) => {
  const { altText, caption, etsyUrl, upload, size } = imageData;
  const {
    data: {
      attributes: {
        formats: { large, medium, small, thumbnail },
      },
    },
  } = upload;

  const setSize = size || ("medium" as keyof Urls);

  let data = {
    altText,
    caption,
    etsyUrl,
    urls: {
      large: large.url,
      medium: medium.url,
      small: small.url,
      thumbnail: thumbnail.url,
    },
    size: setSize,
  };

  return data;
};

export const parseImageArray = (imageData: ImageComponent[]) => {
  return imageData.map(parseImage);
};

export const parsePageData = ({
  title,
  longDescription,
}: PageDataComponent) => ({
  title,
  longDescription,
});

export const parsePages = ({ data }: MultiUpload) => {
  return data.map(
    ({
      attributes: {
        formats: { large, medium, small, thumbnail },
      },
    }) => ({
      urls: {
        large: large.url,
        medium: medium.url,
        small: small.url,
        thumbnail: thumbnail.url,
      },
    })
  );
};
