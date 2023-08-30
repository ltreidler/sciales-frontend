/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const arrowStyles = css({
  transform: "scale(1.2)",
});

export const LeftArrow = () => (
  <span
    css={[arrowStyles, { margin: "0.1rem 0.5rem 0 0" }]}
    className="material-symbols-outlined"
  >
    west
  </span>
);

export const RightArrow = () => (
  <span
    css={[arrowStyles, { margin: "0.1rem 0 0 0.5rem" }]}
    className="material-symbols-outlined"
  >
    east
  </span>
);
