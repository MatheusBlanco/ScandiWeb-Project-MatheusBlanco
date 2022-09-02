export const openClose = (textObj) => {
  const res = {
    type: "OPEN_CLOSE",
    payload: textObj,
  };
  return res;
};
