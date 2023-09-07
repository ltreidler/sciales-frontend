/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { mq } from "../emotion/global";
import { parseImage, parsePageData, parsePages } from "./functions";
import { SinglePage, Image, NovelPageType, Details } from "../../types";
import { useEffect, useState } from "react";
import { StyledImage, StyledButton, Column } from "../emotion";
import { PreviewModal } from "./PreviewModal";
import { DetailsComponent } from "./DetailsComponent";

export const NovelPage = ({ pageData, pageMedia, tabName }: NovelPageType) => {
  const { coverPage, pages } = pageMedia[0];
  const [details, setDetails] = useState<Details | null>(null);
  const [cover, setCover] = useState<Image | null>(null);
  const [pagesArr, setPagesArr] = useState<SinglePage[] | null>(null);
  const [showPages, setShowPages] = useState(false);

  useEffect(() => {
    if (!pageData || !coverPage || !pages) return;
    setDetails(parsePageData(pageData));
    setCover(parseImage(coverPage));
    setPagesArr(parsePages(pages));
  }, [pageData, coverPage, pages]);

  useEffect(() => {
    if (showPages) window.scrollTo({ top: 0, behavior: "smooth" });
  }, [showPages]);

  const articleStyles = css(
    mq({
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      width: "100%",
    })
  );

  return (
    <>
      <article css={articleStyles}>
        <DetailsComponent details={details} width={["30%"]} />
        <Column width="60%">
          <StyledImage
            src={cover?.urls.medium}
            minWidth={["20rem", "25rem", "27rem", "30rem"]}
            maxWidth="20rem"
          />
          <StyledButton onClick={() => setShowPages(!showPages)}>
            {!showPages ? "Preview book" : "Close"}
          </StyledButton>
        </Column>
      </article>
      {!!pagesArr && showPages && (
        <PreviewModal
          pages={pagesArr}
          close={() => setShowPages(false)}
          title={tabName}
        />
      )}
    </>
  );
};
