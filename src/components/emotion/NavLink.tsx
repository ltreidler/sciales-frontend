/** @jsxImportSource @emotion/react */
import { NavLink as Link } from "react-router-dom";
import { mq, colors, fontWeights } from "./global";
import styled from "@emotion/styled";
import { createSlug, capitalize } from "../../utils";
import { css } from "@emotion/react";

const { dark, light, active } = colors;

type StyledNavLinkProps = {
  isActive?: boolean;
  size: "large" | "small";
};

type NavLinkProps = StyledNavLinkProps & {
  text: string;
  type?: "comics" | "illustrations";
  className?: string;
  id?: string;
};

export const StyledNavLink = styled.p(
  ({ isActive, size }: StyledNavLinkProps) =>
    mq({
      fontSize: size === "large" ? [20, 20, 16, 17] : [15, 15, 14, 13, 14],
      fontWeight: size === "large" ? fontWeights.medium : fontWeights.regular,
      transition: "0.2s",
      color: isActive ? active : dark,
      fontFamily: "Chivo",
      textTransform: "uppercase",
      margin: (size === "large" ? "5vh" : "0.5rem") + " 0.5rem 0 0.5rem",
      "&:hover": {
        color: light,
      },
    })
);

export const NavLink = ({
  text,
  type,
  className,
  id,
  ...props
}: NavLinkProps) => {
  const to = `/${type ? type + "/" : ""}${createSlug(text)}`;

  const linkStyle = css({
    transition: "inherit",
    color: "inherit",
    fontFamily: "inherit",
  });

  return (
    <StyledNavLink {...props}>
      <Link
        to={to}
        className={className || ""}
        id={id || ""}
        css={linkStyle}
        style={({ isActive }) => ({
          color: isActive ? active : "inherit",
        })}
      >
        {text}
      </Link>
    </StyledNavLink>
  );
};
