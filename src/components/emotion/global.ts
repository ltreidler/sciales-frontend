//global styles
import facepaint from "facepaint";

const breakpoints = [400, 576, 768, 992, 1200];

export const mq = facepaint(
  breakpoints.map((bp) => `@media (min-width: ${bp}px)`)
);

export const colors = {
  dark: "#03588C",
  light: "#ACD7F2",
  nearBlack: "#0D0D0D",
  nearWhite: "#F2F2F2",
  darkGray: "#595959",
  active: "#55B3D9",
  lightGray: "#E6E6E6",
};

export const fontWeights = {
  light: 200,
  regular: 400,
  medium: 500,
  semibold: 700,
  bold: 800,
  black: 900,
};

export const headerFont = "Roboto Slab";
export const bodyFont = "Chivo";
