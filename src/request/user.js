import { baseUrl } from "../setting";
import { request, requestJson } from "./";

export const getProfile = (token) => {
  return request(`${baseUrl}b/user/profile`, "GET", {
    token,
  });
};

export const login = (email, password) => {
  return requestJson(
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
  return requestJson(
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
  return requestJson(
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
  return requestJson(
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

export const setProfile = (token, fullname) => {
  return requestJson(`${baseUrl}b/user/profile/set`, "PUT", {
    "Content-Type": "application/json",
    "token" : token
  }, {fullname})
}

export const changePass = (token, oldPass, newPass) => {
  return requestJson(`${baseUrl}b/user/password/set`, "PUT", {
    "Content-Type": "application/json",
    "token" : token
  }, {
    old_password : oldPass,
    new_password : newPass
  })
}

export const changePp = (token, photo) => {
  const form = new FormData()
  form.append("photo", photo)

  return request(`${baseUrl}b/user/profile/picture/set`, "PUT", {
    token
  }, form)
}