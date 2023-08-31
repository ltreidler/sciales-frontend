/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { mq } from "../emotion/global";
import { ApiBioPage, BioPageType } from "../../types";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { H2, Body } from "../emotion";
import { EventList } from "./EventList";
import { ErrorPage } from "../ErrorPage";

export const BioPage = () => {
  const [pageData, setPageData] = useState<BioPageType | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const {
        data: { data },
      }: AxiosResponse<ApiBioPage> = await axios.get("/api/bio?populate=deep");

      if (data) setPageData(data.attributes);
      else
        setError(
          "We couldn't find what you were looking for. Please try again later."
        );
    } catch (err) {
      setError("An error occurred. Please try again later.");
    }
  };

  const columnStyles = css(
    mq({
      display: "flex",
      justifyContent: [
        "flex-start",
        "flex-start",
        "center",
        "center",
        "space-between",
      ],
      alignItems: "center",
      margin: "4rem auto",
      //backgroundColor: ["pink", "purple", "yellow", "blue", "orange", "red"],
      width: ["80%", "100%", "100%", "85%", "85%"],
    })
  );

  const eventStyles = css(
    mq({
      width: ["90%", "90%", "90%", "80%", "50%"],
      textAlign: ["center", "center", "center", "center", "left"],
    })
  );

  const statementStyles = css(
    mq({
      width: ["90%", "90%", "90%", "80%", "50%"],
    })
  );

  return (
    <>
      {pageData?.artistStatement && (
        <article id="bio">
          <section
            css={[
              columnStyles,
              css(
                mq({
                  flexDirection: [
                    "column",
                    "column",
                    "column",
                    "column",
                    "row",
                  ],
                })
              ),
            ]}
          >
            <H2>E.B. Sciales</H2>
            <Body css={statementStyles}>{pageData.artistStatement}</Body>
          </section>
          <section
            css={[
              columnStyles,
              css(
                mq({
                  flexDirection: [
                    "column-reverse",
                    "column-reverse",
                    "column-reverse",
                    "column-reverse",
                    "row",
                  ],
                  marginTop: "3rem",
                })
              ),
            ]}
          >
            <EventList events={pageData.events} />
            <H2 css={eventStyles}>Upcoming Events</H2>
          </section>
        </article>
      )}
      {!!error && <ErrorPage header="Sorry!" message={error} />}
    </>
  );
};
