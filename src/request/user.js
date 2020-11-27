import { baseUrl } from "../setting";
import { request } from "./";

export const getProfile = (token) => {
  return request(`${baseUrl}b/user/profile`, "GET", {
    token,
  });
};

export const login = (email, password) => {
  return request(
    `${baseUrl}b/user/login`,
    "POST",
    {
      "Content-Type": "application/json",
    },
    {
      email,
      password,
    }
  );
};

export const registerRequest = (email, fullname, password) => {
  return request(
    `${baseUrl}b/user/register/request`,
    "POST",
    {
      "Content-Type": "application/json",
    },
    {
      email,
      fullname,
      password,
    }
  );
};

export const register = (token) => {
  return request(`${baseUrl}b/user/register/token/${token}`, "PUT");
};

export const resetPasswordRequest = (email) => {
  return request(
    `${baseUrl}b/user/password/reset`,
    "POST",
    {
      "Content-Type": "application/json",
    },
    {
      email,
    }
  );
};

export const resetPassword = (token, password) => {
  return request(
    `${baseUrl}b/user/password/reset/token/${token}`,
    "PUT",
    {
      "Content-Type": "application/json",
    },
    {
      password,
    }
  );
};

export const checkResetPasswordToken = (token) => {
  return request(`${baseUrl}b/user/password/reset/check/token/${token}`, "GET");
};

export const logout = (token) => {
  return request(`${baseUrl}b/user/logout`, "DELETE", {
    token,
  });
};
