import styled from "@emotion/styled";
import { mq } from "./global";

export const PageContainer = styled.section(
  mq({
    display: "flex",
    marginLeft: [0, 0, 0, "20%", "18%"],
    justifyContent: "center",
    alignItems: "flex-start",
    marginTop: "1rem",
    paddingBottom: "5rem",
    zIndex: 1,
  })
);
