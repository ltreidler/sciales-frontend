import { H3, H2 } from "../emotion";
import { Link } from "react-router-dom";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { mq, colors } from "../emotion/global";

const { dark, light } = colors;

export const Error = ({ error }: { error: string }) => {
  const message =
    error === "Page not found"
      ? "We couldn't find the comic you were looking for."
      : "Something went wrong. Please try again later.";

  const errorStyles = css(
    mq({
      width: ["80vw", "80vw", "80vw", "80vw", "60vw"],
      textAlign: "center",
    })
  );

  const linkStyles = css({
    fontSize: ["30px", "35px"],
    color: dark,
    fontWeight: "regular",
    "&:hover": {
      color: light,
    },
  });

  return (
    <div css={errorStyles}>
      <H2>Oh no!</H2>
      <H3 css={{ marginBottom: "2rem" }}>{message}</H3>
      <Link to="/" css={linkStyles}>
        Click here to go home
      </Link>
    </div>
  );
};
