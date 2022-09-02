export const setNewRoute = (textObj) => {
  const res = {
    type: "NEW_ROUTE",
    payload: textObj,
  };
  return res;
};
