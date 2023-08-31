/** @jsxImportSource @emotion/react */
import { NavLink, StyledNavLink } from "../emotion";
import { css } from "@emotion/react";
import { capitalize } from "../../utils";
import { mq, colors } from "../emotion/global";
import { TabList } from "./TabList";
import { NavBarProps } from "./NavBar";
const { nearWhite } = colors;

interface NavProps {
  type: "mobile" | "desktop";
  contentPages: (keyof NavBarProps)[];
  show: {
    comics: boolean;
    illustrations: boolean;
  };
  props: NavBarProps;
  translateVal: string;
  path1: string;
  toggleShow: (s: "comics" | "illustrations") => void;
  pages: string[];
}

export const NavLinks = ({
  type,
  contentPages,
  show,
  props,
  translateVal,
  path1,
  toggleShow,
  pages,
}: NavProps) => {
  const mobileStyles = {
    display: ["block", "block", "block", "none"],
  };

  const desktopStyles = {
    display: ["none", "none", "none", "block"],
  };
  const navStyle = css(
    mq({
      flexDirection: "column",
      padding: ["3rem 3rem 3rem 1rem", "3rem 4rem", "3rem 4rem", "25vh 1rem"],
      position: "fixed",
      height: ["90vh", "90vh", "90vh", "60vh"],
      justifyContent: "flex-start",
      alignItems: ["flex-end", "flex-end", "flex-end", "flex-start"],
      width: ["50vw", "50vw", "50vw", "20vw"],
      transform: [translateVal, translateVal, translateVal, "none"],
      backgroundColor: [nearWhite, nearWhite, nearWhite, "transparent"],
      top: [0, 0],
      transition: "0.3s",
      ...(type === "mobile" ? mobileStyles : desktopStyles),
    })
  );

  return (
    <nav css={navStyle}>
      <NavLink text="Home" size="large" id="nav-home" />
      {contentPages.map((page, i) => (
        <div key={i}>
          <StyledNavLink
            isActive={path1 === page}
            size="large"
            onClick={() => toggleShow(page)}
            id={`nav-${page}`}
          >
            {capitalize(page)}
          </StyledNavLink>
          <TabList tabs={props[page]} show={show[page]} type={page} />
        </div>
      ))}
      {pages.map((page, i) => (
        <NavLink key={i} id={`nav-${page}`} text={page} size="large" />
      ))}
    </nav>
  );
};
