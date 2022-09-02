import { combineReducers } from "redux";
import currency from "./currency";
import cart from "./cart";
import popUpReducer from "./popUpReducer";
import category from "./category";

const rootReducer = combineReducers({
  currency,
  cart,
  popUpReducer,
  category,
});

export default rootReducer;
