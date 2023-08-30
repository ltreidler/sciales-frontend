/** @jsxImportSource @emotion/react */
import { NavLink } from "../emotion";
import { css } from "@emotion/react";
import { mq } from "../emotion/global";

interface TabListProps {
  tabs: string[];
  show: boolean;
  type: "comics" | "illustrations";
}

export const TabList = ({ tabs, show, type }: TabListProps) => {
  const display = show ? "block" : "none";

  const tabListStyle = css(
    mq({
      display,
      transition: "0.3s",
      transform: `translateY(${show ? 0 : -2}rem)`,
    })
  );

  return (
    <ul id={`tabList-${type}`} css={tabListStyle}>
      {tabs?.map((tab, i) => (
        <NavLink
          className={`navlink-${type}`}
          key={i}
          text={tab}
          size="small"
          type={type}
        />
      ))}
    </ul>
  );
};
