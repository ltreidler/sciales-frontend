/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { mq } from "../emotion/global";
import { Event } from "../../types";
import { H3, Body, StyledLink } from "../emotion";

export const EventList = ({ events }: { events: Event[] }) => {
  const sectionStyles = css(
    mq({
      width: ["90%", "90%", "90%", "80%", "35%"],
    })
  );

  const parseDate = (date: string) =>
    new Date(date).toLocaleDateString("en-us", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  return (
    <section css={sectionStyles}>
      {events?.length ? (
        <section>
          {events.map(
            ({ eventName, date, location, description, link }, id) => (
              <div key={id} css={{ marginTop: "2rem" }}>
                <H3>{eventName}</H3>
                <Body>
                  <b>
                    {parseDate(date)} | {location}
                  </b>
                </Body>
                <Body>{description}</Body>
                {!!link && (
                  <StyledLink target="_blank" href={link}>
                    See more details
                  </StyledLink>
                )}
              </div>
            )
          )}
        </section>
      ) : (
        <H3>No upcoming events</H3>
      )}
    </section>
  );
};
