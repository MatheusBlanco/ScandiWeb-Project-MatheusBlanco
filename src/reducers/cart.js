const initialState = {
  items: [],
};
const cart = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state?.items?.filter((item) => item.id !== item.productId),
      };

    default:
      return state;
  }
};

export default cart;
