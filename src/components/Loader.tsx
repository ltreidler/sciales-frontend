/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ScaleLoader as Spinner } from "react-spinners";
import { colors } from "./emotion/global";

export const Loader = ({ loading }: { loading: boolean }) => {
  const loadingCss = css({
    zIndex: 10,
    position: "fixed",
    top: "40%",
    margin: "auto",
  });

  return (
    <div css={loadingCss}>
      <Spinner color={colors.dark} loading={loading} height={50} width={10} />
    </div>
  );
};
