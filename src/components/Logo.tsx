/** @jsxImportSource @emotion/react */
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { ApiLogo } from "../types";
import { css } from "@emotion/react";
import { Link } from "react-router-dom";
import { mq } from "./emotion/global";

export const Logo = () => {
  const [logoUrl, setLogoUrl] = useState<string | null>(null);

  const logoStyles = css(
    mq({
      maxWidth: "12vw",
      minWidth: "9rem",
      padding: "1.5rem",
      position: ["relative", "relative", "relative", "fixed", "fixed", "fixed"],
      top: 0,
      left: 0,
    })
  );

  useEffect(() => {
    fetchLogo();
  }, []);

  const fetchLogo = async () => {
    try {
      const { data }: AxiosResponse<ApiLogo> = await axios.get(
        "/api/logo?populate=*"
      );

      if (data)
        setLogoUrl(
          data.data.attributes.logo.data.attributes.formats.thumbnail.url
        );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {!!logoUrl && (
        <Link id="logo" css={{ height: "fit-content" }} to="/">
          <img src={logoUrl} alt="logo" css={logoStyles} />
        </Link>
      )}
    </>
  );
};
