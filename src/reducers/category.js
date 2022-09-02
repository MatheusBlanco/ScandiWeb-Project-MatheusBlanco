const category = (state = "all", action) => {
  switch (action.type) {
    case `NEW_ROUTE`:
      return {
        value: action.payload,
      };
    default:
      return state;
  }
};

export default category;
