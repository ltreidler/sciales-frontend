/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { mq } from "../emotion/global";
import { Image, GroupPageType, Details } from "../../types";
import { useState, useEffect } from "react";
import { StyledImage } from "../emotion/";
import { parseImageArray, parsePageData } from "./functions";
import { Column } from "../emotion";
import { DetailsComponent } from "./DetailsComponent";

export const GroupPage = ({ pageData, pageMedia }: GroupPageType) => {
  const { images: imagesData, layout, titleSide } = pageMedia[0];
  const [details, setDetails] = useState<Details | null>(null);
  const [images, setImages] = useState<Image[] | null>(null);

  const formatData = () => {
    setImages(parseImageArray(imagesData));
    setDetails(parsePageData(pageData));
  };

  useEffect(() => {
    if (pageData && imagesData) formatData();
  }, [pageData, imagesData]);

  const listStyles = css(
    mq({
      display: "flex",
      flexWrap: "wrap",
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "space-around",
    })
  );

  const rowStyles = css(
    mq({
      display: "flex",
      flexWrap: titleSide === "right" ? "wrap-reverse" : "wrap",
      justifyContent: "center",
    })
  );

  const getWidth = () => {
    if (layout === "doubleRow") return ["60vw", "90%", "80%"];
    if (titleSide === "center") return ["45%"];
    return ["20%"];
  };

  const DetailsComp = () => (
    <DetailsComponent details={details} width={getWidth()} />
  );

  const SingleRow = () => {
    if (!images) return <></>;
    if (titleSide === "center")
      return (
        <>
          <Column width="80vw">
            <DetailsComp />
            <ImageColumn images={images} maxWidth="90vw" />
          </Column>
        </>
      );

    return (
      <div css={rowStyles}>
        {titleSide === "left" && <DetailsComp />}
        <Column width="60%">
          <ImageColumn images={images} maxWidth="100%" />
        </Column>
        {titleSide === "right" && <DetailsComp />}
      </div>
    );
  };

  const DoubleRow = () => {
    if (!images) return <></>;
    let sliceFunc: (e: number) => number;
    if (titleSide === "left") sliceFunc = Math.floor;
    else sliceFunc = Math.ceil;

    return (
      <div css={rowStyles}>
        <Column>
          {titleSide !== "right" && <DetailsComp />}
          <ImageColumn
            images={images?.slice(0, sliceFunc(images.length / 2))}
          />
        </Column>
        <Column>
          {titleSide === "right" && <DetailsComp />}
          <ImageColumn images={images?.slice(sliceFunc(images.length / 2))} />
        </Column>
      </div>
    );
  };

  return (
    <article>
      {!!details && images?.length && (
        <section css={listStyles}>
          {layout === "singleRow" ? <SingleRow /> : <DoubleRow />}
        </section>
      )}
    </article>
  );
};

const ImageColumn = ({
  images,
  maxWidth,
}: {
  images: Image[];
  maxWidth?: string[] | string;
}) => {
  return (
    <>
      {images.map(({ urls, altText, size }, i) => (
        <StyledImage
          key={i}
          src={urls[size]}
          maxWidth={
            maxWidth || ["80vw", "80vw", "70vw", "70vw", "35vw", "35vw"]
          }
          minWidth="24rem"
          alt={altText}
        />
      ))}
    </>
  );
};
