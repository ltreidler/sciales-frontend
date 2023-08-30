/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { mq } from "../emotion/global";
import { Image, SinglePageType, Details } from "../../types";
import { useState, useEffect } from "react";
import { StyledImage } from "../emotion/";
import { parseImage, parsePageData } from "./functions";
import { DetailsComponent } from "./DetailsComponent";

export const SinglePage = ({ pageData, pageMedia }: SinglePageType) => {
  const [details, setDetails] = useState<Details | null>(null);
  const [image, setImage] = useState<Image | null>(null);
  const imageData = pageMedia[0].image;

  useEffect(() => {
    if (pageData && imageData) formatData();
  }, [pageData, imageData]);

  const formatData = () => {
    setDetails(parsePageData(pageData));
    setImage(parseImage(imageData));
  };

  const singlePageStyles = css(
    mq({
      width: "100%",
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      marginBottom: 0,
    })
  );

  return (
    <article>
      {!!details && !!image && (
        <div css={singlePageStyles}>
          <DetailsComponent details={details} width={["20%"]} />
          <StyledImage
            src={image.urls[image.size]}
            alt={image.altText}
            maxHeight="110vh"
            minHeight="40rem"
            minWidth="20rem"
          />
        </div>
      )}
    </article>
  );
};
