import styled from "@emotion/styled";

export const Column = styled.div(({ width }: { width?: string }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",
  maxWidth: width || "48%",
  width,
  margin: "0.5rem",
  padding: 0,
}));
