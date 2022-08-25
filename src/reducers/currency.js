const currency = (state = "$", action) => {
  switch (action.type) {
    case "SET_CURRENCY":
      return {
        ...state,
        value: action.payload,
      };
    case "CLEAR_CURRENCY":
      return {
        ...state,
        value: "$",
      };
    default:
      return state;
  }
};

export default currency;
