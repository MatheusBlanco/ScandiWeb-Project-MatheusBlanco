export const setIsOpen = () => {
  const res = {
    type: "SET_ISOPEN",
    payload: "open",
  };
  console.log("open", res);
  return res;
};

export const setIsClosed = () => {
  const res = {
    type: "SET_ISCLOSED",
    payload: "false",
  };
  console.log("close", res);
  return res;
};
