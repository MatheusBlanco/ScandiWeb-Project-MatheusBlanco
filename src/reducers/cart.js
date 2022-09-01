import { arraysEqual } from "../helpers";

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
        items: state?.items?.filter((item) => item.id !== action?.payload?.id),
      };
    case "REMOVE_ITEM_AMOUNT": {
      const filteredById = state?.items?.filter(
        (item) =>
          item.id === action?.payload?.id &&
          arraysEqual(
            action?.payload?.selectedAttributes,
            item?.selectedAttributes
          )
      );
      const removedLastItem = filteredById.slice(0, filteredById.length - 1);
      const fullArrayWithoutItems = state?.items?.filter(
        (item) => item.productId !== action?.payload?.productId
      );
      return { items: [...fullArrayWithoutItems.concat(removedLastItem)] };
    }
    default:
      return state;
  }
};

export default cart;
