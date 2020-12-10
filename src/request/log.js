import { requestJson } from ".";
import { baseUrl } from "../setting";

export const getLogs = (token, start, limit) => {
  return requestJson(`${baseUrl}b/log/get/${start}/${limit}`, "GET", { token });
};
