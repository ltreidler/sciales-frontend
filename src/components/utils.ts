import { RefObject, useState, useEffect } from "react";

//takes in a ref to a wrapper & a way to set status
export const checkImageStatus = (
  setImageStatus: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const updateStatus = (images: HTMLImageElement[]) => {
    const imagesLoaded = images.every((image) => image.complete);
    console.log("image status change!");
    setImageStatus(imagesLoaded);
  };

  //select all images except logo
  const images = Array.from(document.querySelectorAll("img")).filter(
    ({ className }) => className !== "css-nvihev-Logo"
  );

  console.log(images);

  if (images.length === 0) setImageStatus(true);

  //   //add event listeners to each image that checks if all images have loaded, then sets the status to true if so
  images.forEach((image) => {
    image.addEventListener("load", () => updateStatus(images), {
      once: true,
    });
    image.addEventListener("error", () => updateStatus(images), {
      once: true,
    });
  });
};
