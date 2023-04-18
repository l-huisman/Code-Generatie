export const getImage = (file: any) => {
  //if (typeof file == "string") return `${CLOUD_URL}/${file}`;
  // create the preview
  const objectUrl = URL.createObjectURL(file);

  // free memory when ever this component is unmounted
  return objectUrl;
};
