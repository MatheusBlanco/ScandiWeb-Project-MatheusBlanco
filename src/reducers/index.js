import { combineReducers } from "redux";
import currency from "./currency";
import cart from "./cart";

const rootReducer = combineReducers({
  currency,
  cart,
});

export default rootReducer;
