/** @jsxImportSource @emotion/react */
import { Input, StyledButton, H3, Body } from "../emotion";
import { css } from "@emotion/react";
import { mq } from "../emotion/global";
import { FormValues } from "../../types";
import { useFormContext, SubmitHandler } from "react-hook-form";
import { postContactRequest } from "./contact-strapi";
import React, { useState, SetStateAction } from "react";
import { FormSuccess } from "./FormSuccess";

export type ContactType = "lesson" | "general";

//fill in onSubmit
interface ContactFormProps {
  description?: string;
  contactType: ContactType;
  successMessage: string;
  header?: string;
  width?: Array<string>;
  setSucccess?: React.Dispatch<SetStateAction<boolean>>;
}

export const ContactForm = ({
  description,
  contactType,
  successMessage,
  header,
  width,
  setSucccess,
}: ContactFormProps) => {
  const [submitError, setSubmitError] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "submitted">(
    "idle"
  );

  const formStyles = css(
    mq({
      display: "flex",
      flexFlow: "row wrap",
      width: width || ["80%", "80%", "80%", "80%", "65%", "45%"],
      justifyContent: "space-between",
      margin: 0,
      marginRight: "1rem",
    })
  );

  const buttonStyles = css(
    mq({
      display: "flex",
      justifyContent: ["center", "center", "flex-end"],
      width: "99%",
    })
  );

  const { handleSubmit } = useFormContext<FormValues>();

  //post the form data to the backend, and set a status and/or error based on the response
  const onSubmit: SubmitHandler<FormValues> = async (event): Promise<void> => {
    setStatus("loading");
    //take in the type of request
    //send a request to the backend based on that
    const res: string = await postContactRequest({
      ...event,
      contactType,
      dateSent: new Date(),
    });

    if (res === "Success!") {
      //here's where you'd send an email
      setStatus("submitted");
      if (!!setSucccess) setSucccess(true);
    } else {
      setSubmitError(
        res === "ValidationError"
          ? "Please fill out all required fields"
          : "Something went wrong. Please try again later."
      );
      setStatus("idle");
    }
  };

  //return either the form or the success message
  return (
    <>
      {status !== "submitted" ? (
        <form css={formStyles} onSubmit={handleSubmit(onSubmit)}>
          {!!header && (
            <H3 css={{ margin: "3rem 0.5rem 0 0.5rem" }}>{header}</H3>
          )}
          {!!description && (
            <Body
              dangerouslySetInnerHTML={{ __html: description }}
              css={{ margin: "1rem 0.5rem 3rem 0.5rem" }}
            ></Body>
          )}
          <Input midWidth="45%" width="45%" label="First Name" />
          <Input midWidth="45%" width="45%" label="Last Name" />
          <Input width="45%" label="Email" />
          <Input width="45%" label="Phone" required={false} />

          <Input label="Message" type="textarea" minLength={10} />
          {submitError && <Body css={{ color: "red" }}>{submitError}</Body>}
          <span css={buttonStyles}>
            <StyledButton disabled={status === "loading"} type="submit">
              {status === "loading" ? "Loading..." : "Submit"}
            </StyledButton>
          </span>
        </form>
      ) : (
        <section css={formStyles}>
          <FormSuccess message={successMessage} />
        </section>
      )}
    </>
  );
};
