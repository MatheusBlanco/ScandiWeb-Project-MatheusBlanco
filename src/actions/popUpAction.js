export const setIsOpen = () => {
  const res = {
    type: "SET_ISOPEN",
  };
  return res;
};

export const setIsClosed = () => {
  return {
    type: "SET_ISCLOSED",
  };
};
