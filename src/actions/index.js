export const login = (loginUser) => {
  return {
    type: "LOG_IN",

    payload: loginUser,
  };
};

export const logout = () => {
  return {
    type: "LOG_OUT",
  };
};
