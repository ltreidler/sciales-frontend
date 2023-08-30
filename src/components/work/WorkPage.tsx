/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import axios, { AxiosResponse } from "axios";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { useParams } from "react-router-dom";
import { selectPages } from "../../redux/pagesSlice";
import { useEffect, useState, useRef } from "react";
import { createSlug } from "../../utils";
import {
  TabObject,
  AllWorkTypes,
  AllContentTypes,
  ApiWorkCollection,
  SinglePageType,
  GroupPageType,
  NovelPageType,
} from "../../types";
import { SinglePage, GroupPage, NovelPage } from "./";
import { setCurrentPage } from "../../redux/pagesSlice";
import { ArrowButtons, H2 } from "../emotion";
import { mq, colors } from "../emotion/global";
import { Error } from "./Error";
import { checkImageStatus } from "../utils";
import { Loader } from "../Loader";

type Category = "comics" | "illustrations";

//to add: navigate back to landing if page doesn't exist
export const WorkPage = ({ category }: { category: Category }) => {
  //using the url path, figure out which tab to display
  //ex. /little-eden
  //look into redux and find little-eden
  //using the type of little-eden, make a request to the backend to find the data
  const dispatch = useAppDispatch();
  const pages = useAppSelector(selectPages);
  const [pageType, setPageType] = useState<null | AllContentTypes>(null);
  const [pageData, setPageData] = useState<AllWorkTypes | null>(null);
  const [error, setError] = useState<string | null>(null);
  const ref = useRef<HTMLElement>(null);
  const [imageStatus, setImageStatus] = useState(false);

  useEffect(() => {
    if (!pageData) return;
    checkImageStatus(setImageStatus);
  }, [ref, pageData]);

  const { slug } = useParams<{
    slug: string;
  }>();

  //reset error & image status when page changes
  useEffect(() => {
    setError(null);
    setImageStatus(false);
    console.log(pageData);
  }, [slug]);

  useEffect(() => {
    let currentPage = null;
    if (pages[category]) {
      const idx = pages[category].findIndex(
        ({ tabName }) => createSlug(tabName) === slug
      );
      if (idx > -1) {
        const foundPage = pages[category][idx];
        setPageType(foundPage.type);
        currentPage = { index: idx, category };
        fetchPage(foundPage);
      }
      dispatch(setCurrentPage(currentPage));
    } else setError("Error fetching data");
  }, [slug, pages.comics]);

  const fetchPage = async ({ type, tabName }: TabObject) => {
    try {
      let queryStr = `/api/works?filters[tabName]=${tabName}&populate=deep`;

      const {
        data: { data },
      }: AxiosResponse<ApiWorkCollection> = await axios.get(queryStr);

      if (data[0]) setPageData(data[0].attributes);
      else setError("Page not found");
    } catch (err) {
      console.error(err);
      setError("Error fetching data");
    }
  };

  const pagesCss = css({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "80vh",
    width: "100%",
    paddingTop: ["0", "0", "0", "2rem"],
  });

  const arrowButtonStyles = css(
    mq({
      display: "flex",
      justifyContent: ["center", "center", "center", "flex-end"],
      width: "100%",
      marginTop: [...Array(4).fill("4rem"), "2rem"],
      marginRight: [...Array(4).fill("0"), "10rem"],
    })
  );

  const loadingCss = css({
    zIndex: 10,
    position: "fixed",
    top: "40%",
    left: "50%",
  });

  return (
    <section css={pagesCss} ref={ref}>
      {!!pageData ? (
        <div css={{ opacity: imageStatus ? 1 : 0 }}>
          <div css={{ minHeight: "80vh" }}>
            {pageType === "singles" && (
              <SinglePage {...(pageData as SinglePageType)} />
            )}
            {pageType === "groups" && (
              <GroupPage {...(pageData as GroupPageType)} />
            )}
            {pageType === "novels" && (
              <NovelPage {...(pageData as NovelPageType)} />
            )}
          </div>
          <span css={arrowButtonStyles}>
            <ArrowButtons />
          </span>
        </div>
      ) : (
        <>{error && <Error error={error} />}</>
      )}

      <Loader loading={!imageStatus} />
    </section>
  );
};
