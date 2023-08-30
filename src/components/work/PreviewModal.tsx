/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { mq } from "../emotion/global";
import { SinglePage } from "../../types";
import { useState, useEffect } from "react";
import {
  StyledImage,
  StyledButton,
  StyledBtnSection,
  LeftArrow,
  RightArrow,
} from "../emotion";

const modalStyles = css(
  mq({
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 2,
    margin: "auto",
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgb(0,0,0,0.8)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  })
);

interface PreviewProps {
  pages: SinglePage[];
  close: () => void;
  title: string;
}

export const PreviewModal = ({ pages, close, title }: PreviewProps) => {
  const [currentPage, setCurrentPage] = useState(0);

  const handleNext = () => {
    if (currentPage < pages.length - 1) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") handlePrev();
    if (e.key === "ArrowRight") handleNext();
  };

  const closeOnClick = (e: React.MouseEvent<HTMLElement>) => {
    const { tagName } = e.target as HTMLElement;
    if (tagName === "ASIDE") close();
  };

  return (
    <aside css={modalStyles} onClick={closeOnClick}>
      <StyledButton onClick={close}>Close</StyledButton>
      <StyledImage
        css={{ zIndex: 4 }}
        src={pages[currentPage].urls.medium}
        alt={`Page ${currentPage + 1} of ${title}`}
        height="80vh"
      />
      <StyledBtnSection>
        <div>
          {currentPage > 0 && (
            <StyledButton aria-label="Previous page" onClick={handlePrev}>
              <LeftArrow />
              Prev Page
            </StyledButton>
          )}
        </div>
        <div>
          {currentPage < pages.length - 1 && (
            <StyledButton aria-label="Next page" onClick={handleNext}>
              Next Page <RightArrow />
            </StyledButton>
          )}
        </div>
      </StyledBtnSection>
    </aside>
  );
};
