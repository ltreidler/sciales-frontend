/** @jsxImportSource @emotion/react */
import axios, { AxiosResponse } from "axios";
import { useState, useEffect } from "react";
import { Image, ApiLessonPage } from "../../types";
import { css } from "@emotion/react";
import { mq } from "../emotion/global";
import { FormProvider, useForm } from "react-hook-form";
import { ContactForm } from "./ContactForm";
import { FormValues } from "../../types";
import { ErrorPage } from "../ErrorPage";
import { Loader } from "../Loader";

export const LessonPage = () => {
  const [image, setImage] = useState<null | Image>(null);
  const [description, setDescription] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetchLessonData();
  }, []);

  useEffect(() => {
    if (image && description && successMessage) setLoaded(true);
  }, [image, description, successMessage]);

  useEffect(() => {
    console.log(loaded);
  }, [loaded]);

  const methods = useForm<FormValues>();

  const fetchLessonData = async () => {
    try {
      const {
        data: { data },
      }: AxiosResponse<ApiLessonPage> = await axios.get(
        "/api/lesson-page?populate[image][populate]=*"
      );

      const { image, description, successMessage } = data.attributes;

      const { id, upload, ...imageData } = image;
      const { large, medium, small, thumbnail } =
        upload.data.attributes.formats;

      const urls = {
        large: large.url,
        medium: medium.url,
        small: small.url,
        thumbnail: thumbnail.url,
      };

      setImage({
        ...imageData,
        urls,
      } as Image);

      setDescription(description);
      setSuccessMessage(successMessage);
    } catch (err) {
      setError(true);
    }
  };

  const sectionStyles = css(
    mq({
      display: "flex",
      flexFlow: "row wrap",
      justifyContent: [...Array(5).fill("center"), "space-between"],

      alignItems: "center",
      width: "100%",
      marginTop: "2rem",
    })
  );

  const imageStyles = css(
    mq({
      minWidth: "15rem",
      width: [...Array(4).fill("80%"), "70%", "47%"],
    })
  );

  return (
    <section css={sectionStyles}>
      <Loader loading={!loaded} />
      {error && (
        <ErrorPage
          header="Oh no!"
          message="Something went wrong. Please try again later."
        />
      )}
      {!!image && (
        <img
          src={image.urls[image.size]}
          alt={image.altText}
          css={imageStyles}
        />
      )}
      <FormProvider {...methods}>
        {!!description && !!successMessage && (
          <ContactForm
            description={description}
            contactType="lesson"
            successMessage={successMessage}
            header="Sign up for a trial lesson!"
          />
        )}
      </FormProvider>
    </section>
  );
};

/*

Form (using react-hook-form)
Full Name (text, req)
Email (text, regex, req)
Phone (text, regex, opt)
pronouns (text, opt)
Message (text, req)

Form template (will be reused in contact page -- will it be exactly the same???)
- Submit an array with: label, name (will also be id), type (def = text), required (def = true), regex type (email | phone | null), width (def = 100%), minLength (def = 0)

- Submit button
- Success message

*/
