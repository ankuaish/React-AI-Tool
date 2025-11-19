export const checkHeading = (str) => {
  return /^(\*)(\*)(.*)\*$/.test(str);
};

export const replaceHeadingStars = (str) => {
  return str.replace(/^(\*)(\*)|(\*)$/g, "");
};
