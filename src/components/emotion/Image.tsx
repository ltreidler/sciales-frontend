import styled from "@emotion/styled";
import { mq } from "./global";
import { Image } from "../../types";

interface ImageProps {
  maxHeight?: string | string[];
  minHeight?: string | string[];
  maxWidth?: string | string[];
  height?: string | string[];
  width?: string | string[];
  aspectRatio?: string | string[];
  minWidth?: string | string[];
}

export const StyledImage = styled.img(
  ({
    maxHeight = "90vh",
    maxWidth = "100%",
    height = "",
    minHeight = "",
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
