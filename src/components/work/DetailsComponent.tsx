/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { mq } from "../emotion/global";
import { Details } from "../../types";
import { H3, Body } from "../emotion";

interface Props {
  details: Details | null;
  width?: string[];
}

export const DetailsComponent = ({ details, width }: Props) => {
  const detailsStyles = css(
    mq({
      display: "flex",
      minWidth: "20rem",
      width: width ? ["80vw", "70vw", ...width] : "100%",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      marginBottom: "1rem",
      marginTop: "4rem",
      padding: "0.5rem",
    })
  );
  if (!details) return <></>;
  return (
    <span css={detailsStyles}>
      <H3 css={{ marginBottom: "1rem", width: "80%" }}>{details?.title}</H3>{" "}
      <Body>{details?.longDescription}</Body>
    </span>
  );
};
