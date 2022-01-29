const INITIAL_STATE = {
  currentUser: null,
  allGames: [],
};

const generalReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_CURRENT_USER":
      return {
        ...state,
        currentUser: action.payload,
      };
    case "SET_ALL_GAMES":
      return {
        ...state,
        allGames: action.payload,
      };
    default:
      return state;
  }
};

export default generalReducer;
