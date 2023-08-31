//takes in a ref to a wrapper & a way to set status
export const checkImageStatus = (
  setImageStatus: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const updateStatus = (images: HTMLImageElement[]) => {
    const imagesLoaded = images.every((image) => image.complete);
    setImageStatus(imagesLoaded);
  };

  //select all images except logo
  const images = Array.from(document.querySelectorAll("img")).filter(
    ({ className }) => className !== "css-nvihev-Logo"
  );

  if (images.length === 0) setImageStatus(true);

  updateStatus(images);

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
