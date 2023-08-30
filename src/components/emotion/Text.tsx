/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { colors, mq } from "./global";
import { fontWeights, headerFont, bodyFont } from "./global";

interface TextProps {
  color?: keyof typeof colors;
  fontWeight?: keyof typeof fontWeights;
}

interface CreateTextProps {
  color: keyof typeof colors;
  fontWeight: keyof typeof fontWeights;
  type?: "body";
}

const createTextProps = ({ color, fontWeight, type }: CreateTextProps) => ({
  fontWeight: fontWeights[fontWeight],
  color: colors[color],
  margin: "0.4rem",
  fontFamily: type === "body" ? bodyFont : headerFont,
});

export const H1 = styled.h1(
  ({ color = "nearBlack", fontWeight = "black" }: TextProps) =>
    mq({
      fontSize: [55, 60, 80, 90, 100],
      ...createTextProps({ color, fontWeight }),
    })
);

export const H2 = styled.h2(
  ({ color = "nearBlack", fontWeight = "bold" }: TextProps) =>
    mq({
      fontSize: [40, 48, 55, 60, 70],
      ...createTextProps({ color, fontWeight }),
    })
);

export const H3 = styled.h3(
  ({ color = "nearBlack", fontWeight = "medium" }: TextProps) =>
    mq({
      fontSize: [25, 30, 32, 33, 34],
      ...createTextProps({ color, fontWeight }),
    })
);

export const H4 = styled.p(
  ({ color = "nearBlack", fontWeight = "regular" }: TextProps) =>
    mq({
      fontSize: [16, 17, 18, 19, 20],
      ...createTextProps({ color, fontWeight }),
    })
);

export const Body = styled.p(
  ({ color = "nearBlack", fontWeight = "regular" }: TextProps) =>
    mq({
      fontSize: [14, 15, 16, 17, 17],
      ...createTextProps({ color, fontWeight, type: "body" }),
    })
);

export const Caption = styled.p(
  ({ color = "nearBlack", fontWeight = "light" }: TextProps) =>
    mq({
      fontSize: [15, 18, 21, 24, 27],
      ...createTextProps({ color, fontWeight, type: "body" }),
    })
);

export const StyledLink = styled.a(
  ({ color = "dark", fontWeight = "regular" }: TextProps) =>
    mq({
      fontSize: [14, 15, 16, 17, 17],
      ...createTextProps({ color, fontWeight, type: "body" }),
      transition: "0.3s",
      "&:hover": {
        color: colors.light,
      },
    })
);
