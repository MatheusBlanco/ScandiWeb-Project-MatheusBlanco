const popUpReducer = (state = false, action) => {
  switch (action.type) {
    case "SET_ISOPEN":
      console.log("open");
      return {
        value: true,
      };
    case "SET_ISCLOSED":
      console.log("close");

      return {
        value: false,
      };
    default:
      return state;
  }
};

export default popUpReducer;
