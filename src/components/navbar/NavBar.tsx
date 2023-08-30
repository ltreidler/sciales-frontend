/** @jsxImportSource @emotion/react */
import { useState, useMemo, memo, useEffect } from "react";
import { css } from "@emotion/react";
import { mq, colors } from "../emotion/global";
import { Logo } from "..";
import { useLocation } from "react-router-dom";
import { NavLinks } from "./NavLinks";
const { nearBlack } = colors;

export interface NavBarProps {
  comics: string[];
  illustrations: string[];
}

export const NavBar = (props: NavBarProps) => {
  //get the url of the page, in order to highlight which page we're on
  const [path1, path2] = useLocation().pathname.split("/").slice(1);

  //Tabs to display
  const pages = ["Lessons", "Bio", "Contact"];
  type ShowKey = keyof typeof show;
  const contentPages: ShowKey[] = ["comics", "illustrations"];

  //MOBILE ONLY:
  //for toggling on mobile
  const [toggleMenu, setToggleMenu] = useState(false);
  const translateVal = useMemo(
    () => `translateX(${toggleMenu ? "37" : "100"}vw)`,
    [toggleMenu]
  );

  //close the mobile menu when the page changes
  useEffect(() => {
    setToggleMenu(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [path1, path2]);

  //DESKTOP & MOBILE:
  //set whether comics or illustrations is open on mount
  const [show, setShow] = useState({
    comics: "comics" === path1,
    illustrations: "illustrations" === path1,
  });

  //for toggling whether comics and illustrations tabs are open on desktop
  const toggleShow = (type: ShowKey) => {
    if (type === path1) setShow({ ...show, [type]: true });
    else setShow({ ...show, [type]: !show[type] });
  };

  const mobileCss = css(
    mq({
      display: ["block", "block", "block", "none"],
    })
  );

  const toggleCss = css(
    mq({
      position: "absolute",
      right: "1rem",
      top: "0.5rem",
      zIndex: 1,
      color: nearBlack,
      padding: "1rem",
      fontSize: "70px",
    })
  );

  const navProps = {
    contentPages,
    show,
    props,
    translateVal,
    path1,
    toggleShow,
    pages,
  };

  //mobile nav will show at small screen sizes, desktop nav on medium -> large screen sizes
  return (
    <section css={{ transition: "0.3s" }}>
      <Logo />
      {/* <i
        className={`fa-sharp fa-solid fa-${toggleMenu ? "x" : "bars"} fa-4x`}
        css={[toggleCss, mobileCss]}
        onClick={() => setToggleMenu(!toggleMenu)}
      ></i> */}
      <span
        className="material-symbols-outlined"
        css={[toggleCss, mobileCss]}
        onClick={() => setToggleMenu(!toggleMenu)}
      >
        {!toggleMenu ? "menu" : "close"}
      </span>
      {/* <Nav cssStyle={mobileCss} />
      <Nav cssStyle={desktopCss} /> */}
      <NavLinks type="mobile" {...navProps} />
      <NavLinks type="desktop" {...navProps} />
    </section>
  );
};
