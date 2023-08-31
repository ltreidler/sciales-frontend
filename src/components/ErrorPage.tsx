/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { colors } from "./emotion/global";
import { H2, H3 } from "./emotion/Text";

const { dark, light } = colors;

interface ErrorProps {
  header: string;
  message: string;
}

const errorStyles = css({
  margin: "10% auto",
  textAlign: "center",
  backgroundColor: dark,
  color: light,
  padding: "5vw",
});

export const ErrorPage = ({ header, message }: ErrorProps) => {
  return (
    <section css={errorStyles}>
      <H2 color="light">{header}</H2>
      <H3 color="light">{message}</H3>
    </section>
  );
};
