import styled from "@emotion/styled";
import { mq } from "./global";

interface ImageProps {
  maxWidth?: string | string[];
  width?: string | string[];
  aspectRatio?: string | string[];
  minWidth?: string | string[];
}

export const StyledImage = styled.img(
  ({
    maxWidth = "100%",
    width = "",
    aspectRatio = "",
    minWidth = "25rem",
  }: ImageProps) =>
    mq({
      minWidth,
      maxWidth,
      margin: "0.5rem",
      height: "auto",
      width,
      aspectRatio,
    })
);
