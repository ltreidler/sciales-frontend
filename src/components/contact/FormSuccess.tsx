/** @jsxImportSource @emotion/react */
import { H3, H4 } from "../emotion";
import { css } from "@emotion/react";
import { mq, colors } from "../emotion/global";

export const FormSuccess = ({ message }: { message: string }) => {
  const { dark } = colors;
  const divStyles = css(
    mq({
      backgroundColor: dark,
      padding: "2rem",
      textAlign: "center",
    })
  );

  const [header, ...body] = message.split("!");

  return (
    <div css={divStyles}>
      <H3 color="nearWhite">{header}!</H3>
      <H4 color="nearWhite">{body}</H4>
    </div>
  );
};
