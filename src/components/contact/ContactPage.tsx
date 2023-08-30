/** @jsxImportSource @emotion/react */
import { ContactForm } from "./ContactForm";
import { FormProvider, useForm } from "react-hook-form";
import { FormValues } from "../../types";
import { H2 } from "../emotion";
import { css } from "@emotion/react";
import { mq } from "../emotion/global";
import { useState } from "react";

export const ContactPage = () => {
  const header = "Let's get in touch!";
  const successMessage =
    "Thanks for reaching out! I'll get back to you as soon as I can.";
  const [success, setSucccess] = useState(false);

  const formProps = {
    successMessage,
    width: ["80%", "80%", "80%", "80%", "65%", "52%"],
    setSucccess,
  };

  const articleStyles = css(
    mq({
      display: "flex",
      flexFlow: "row wrap",
      margin: [Array(5).fill("5% 0 0 5%"), "10% 5% 5% 0"],
      width: "100%",
      justifyContent: "space-around",
      alignItems: "center",
    })
  );

  const headerStyles = css(
    mq({
      marginBottom: [...Array(5).fill("1rem"), "20%"],
      marginRight: "2rem",
      width: [...Array(5).fill("100%"), "40%"],
      textAlign: [...Array(5).fill("center"), "right"],
    })
  );

  const methods = useForm<FormValues>();

  return (
    <FormProvider {...methods}>
      <article css={articleStyles}>
        {!success && <H2 css={headerStyles}>{header}</H2>}
        <ContactForm contactType="general" {...formProps} />
      </article>
    </FormProvider>
  );
};
