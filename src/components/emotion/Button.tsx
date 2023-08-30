/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { colors, mq, fontWeights, headerFont } from "./global";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { useState, useEffect } from "react";
import { createSlug } from "../../utils";
import { RightArrow, LeftArrow } from "./Arrows";

const { nearBlack, nearWhite } = colors;

export const StyledButton = styled.button(({ width }: { width?: string }) =>
  mq({
    fontSize: [20, 21, 22, 23, 24],
    fontWeight: fontWeights.medium,
    fontFamily: headerFont,
    minWidth: width || "5rem",
    width: width || "",
    padding: "0.3rem 0.5rem",
    margin: "0.2rem",
    color: nearBlack,
    border: `0.15rem solid ${nearBlack}`,
    background: nearWhite,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "0.1s",
    "&:hover": {
      background: nearBlack,
      color: nearWhite,
    },
  })
);

export const InvisibleButton = styled.button(() => ({
  background: "none",
  border: "none",
  padding: "0",
  width: "fit-content",
  height: "fit-content",
}));

interface ButtonLinkProps {
  to: string;
  text: string;
}

export const ButtonLink = ({ to, text }: ButtonLinkProps) => {
  return (
    <Link to={to}>
      <StyledButton>{text}</StyledButton>
    </Link>
  );
};

export const StyledBtnSection = styled.section(
  mq({
    width: "22rem",
    justifyContent: "space-between",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  })
);

export const ArrowButtons = () => {
  const { currentPage, ...rest } = useAppSelector((state) => state.pages);
  const [next, setNext] = useState<undefined | string>(undefined);
  const [prev, setPrev] = useState<undefined | string>(undefined);

  useEffect(() => {
    setLinks();
  }, [currentPage]);

  const createSlugArray = (array: { tabName: string }[], category: string) =>
    array.map(({ tabName }) => `/${category}/${createSlug(tabName)}`);

  const setLinks = () => {
    if (!currentPage) return;

    const { index, category } = currentPage;
    const comicsLength = rest.comics.length;

    let startingIndex = index;
    if (category === "illustrations") startingIndex += comicsLength;

    const queriesArray = [
      ...createSlugArray(rest.comics, "comics"),
      ...createSlugArray(rest.illustrations, "illustrations"),
    ];

    setNext(queriesArray[startingIndex + 1]);
    setPrev(queriesArray[startingIndex - 1]);
  };

  return (
    <StyledBtnSection>
      <div>
        {!!prev && (
          <Link to={prev}>
            <StyledButton
              css={{ padding: "0.3rem 5rem" }}
              aria-label="Previous page"
              id="prev"
              width="9rem"
            >
              <LeftArrow />
              Previous
            </StyledButton>
          </Link>
        )}
      </div>
      <div>
        {!!next && (
          <Link to={next}>
            <StyledButton
              css={{ padding: "0.3rem 5rem" }}
              aria-label="Next page"
              id="next"
              width="9rem"
            >
              Next
              <RightArrow />
            </StyledButton>
          </Link>
        )}
      </div>
    </StyledBtnSection>
  );
};
