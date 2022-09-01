const popUpReducer = (state = false, action) => {
  console.log(state, action);
  switch (action.type) {
    case "SET_ISOPEN":
      console.log("open no reducer");
      return {
        ...state,
        value: true,
      };
    case "SET_ISCLOSED":
      console.log("close no reducer");

      return {
        ...state,
        value: false,
      };
    default:
      return state;
  }
};

export default popUpReducer;
