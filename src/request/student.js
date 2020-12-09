import { request, requestJson } from "."
import { baseUrl } from "../setting"

export const getStudents = (token, start, limit, approved) => {
  return request(`${baseUrl}b/student/get/${start}/${limit}/${approved}`, "GET", {token});
}

export const setStudent = (token, studentId, approved) => {
  return requestJson(`${baseUrl}b/student/set/${studentId}`, "PUT", {
    token,
    "Content-Type": "application/json"
  }, {approved});
}