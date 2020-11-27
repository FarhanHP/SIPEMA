export const getLoginToken = () => {
  return window.localStorage.getItem("login_token");
};

export const setLoginToken = (token) => {
  window.localStorage.setItem("login_token", token);
};

export const deleteLoginToken = () => {
  window.localStorage.removeItem("login_token");
};
