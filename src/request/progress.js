import { request, requestJson } from ".";
import { baseUrl } from "../setting";

export const getProgressByStudentId = (token, studentId, start, limit) => {
  return request(`${baseUrl}b/progress/get/s/${studentId}/${start}/${limit}`, "GET", { token });
};

export const createProgress = (token, studentId, progressItem) => {
  return requestJson(
    `${baseUrl}b/progress/create/s/${studentId}`,
    "POST",
    {
      token,
      "Content-Type": "application/json",
    },
    progressItem,
  );
};

export const editProgress = (token, progressId, progressItem) => {
  return requestJson(
    `${baseUrl}b/progress/edit/${progressId}`,
    "PUT",
    {
      token,
      "Content-Type": "application/json",
    },
    progressItem,
  );
};

export const deleteProgress = (token, progressId) => {
  return requestJson(`${baseUrl}b/progress/delete/${progressId}`, "DELETE", { token });
};
