export const addItem = (obj) => {
  const res = {
    type: "ADD_ITEM",
    payload: obj,
  };
  return res;
};

export const removeItem = (obj) => {
  const res = {
    type: "REMOVE_ITEM",
    payload: obj,
  };
  return res;
};

export const removeItemAmount = (obj, fullArray) => {
  const res = {
    type: "REMOVE_ITEM_AMOUNT",
    payload: obj,
    fullArray,
  };
  return res;
};
