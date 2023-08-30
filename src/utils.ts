export const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

export const createSlug = (str: string) =>
  str
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

export const camelCase = (str: string) => {
  const words = str.split(" ");
  return words[0].toLowerCase() + words.slice(1).map(capitalize).join("");
};
