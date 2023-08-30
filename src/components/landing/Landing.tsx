/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { mq } from "../emotion/global";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { ApiLandingPage, Image } from "../../types";
import { parseImage } from "../work/functions";
import { StyledImage } from "../emotion";
import { ErrorPage } from "../ErrorPage";
import { checkImageStatus } from "../utils";
import { Loader } from "../Loader";

export const Landing = () => {
  //hold the image in state
  //type =
  const [image, setImage] = useState<Image | null>(null);
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (!image) return;
    checkImageStatus(setLoaded);
  }, [image]);

  const fetchData = async () => {
    try {
      const {
        data: { data },
      }: AxiosResponse<ApiLandingPage> = await axios.get(
        "/api/landing?[populate][image][populate]=*"
      );

      if (data?.attributes.image) setImage(parseImage(data.attributes.image));
    } catch (err) {
      setError(true);
    }
  };

  const imageStyles = css(mq({}));

  const landingStyles = css(
    mq({
      marginTop: ["30%", "20%", "10%", "30%", "15%"],
      maxWidth: ["98vw", "98vw", "90vw", "90vw"],
      width: "100%",
      display: "flex",
      justifyContent: "center",
    })
  );

  //return the image if it exists
  return (
    <>
      <Loader loading={!loaded} />
      {error ? (
        <ErrorPage
          header="Sorry!"
          message="Something went wrong. Please come back later."
        />
      ) : (
        <section css={landingStyles}>
          <div css={imageStyles}>
            {!!image && (
              <StyledImage
                src={image.urls[image.size]}
                alt={image.altText}
                aspectRatio="914 / 344"
                minWidth={[
                  "30rem",
                  "30rem",
                  "30rem",
                  "40rem",
                  "50rem",
                  "70rem",
                ]}
              />
            )}
          </div>
        </section>
      )}
    </>
  );
};
