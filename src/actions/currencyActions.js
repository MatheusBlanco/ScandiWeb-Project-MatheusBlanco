export const setCurrency = (textObj) => {
  const res = {
    type: "SET_CURRENCY",
    payload: textObj,
  };
  return res;
};

export const clearCurrency = () => {
  return {
    type: "CLEAR_CURRENCY",
  };
};
