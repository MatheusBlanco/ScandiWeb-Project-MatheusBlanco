const popUpReducer = (state = false, action) => {
  switch (action.type) {
    case "OPEN_CLOSE":
      return {
        ...state,
        value: action.payload,
      };
    default:
      return state;
  }
};

export default popUpReducer;
