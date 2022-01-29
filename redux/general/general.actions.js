export const setCurrentUser = (currentUser) => {
  return {
    type: "SET_CURRENT_USER",
    payload: currentUser,
  };
};


export const setAllGames = (allGames) => {
  return {
    type: "SET_ALL_GAMES",
    payload: allGames,
  };
};
