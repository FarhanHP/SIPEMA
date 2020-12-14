import { request, requestJson } from "."
import { baseUrl } from "../setting"

export const createAnnouncement = (title, body, token) => {
  return requestJson(`${baseUrl}b/announcement/create`, "POST", {
    "Content-Type": "application/json",
    token
  }, {
    title,
    body
  })
}

export const editAnnouncement = (announcementId, title, body, token) => {
  return requestJson(`${baseUrl}b/announcement/edit/${announcementId}`, "PUT", {
    "Content-Type": "application/json",
    token
  }, {
    title,
    body
  })
}

export const deleteAnnouncement = (announcementId, token) => {
  return request(`${baseUrl}b/announcement/delete/${announcementId}`, "DELETE", {token})
}

export const getAnnouncements = (start, limit, token) => {
  return request(`${baseUrl}b/announcement/get/${start}/${limit}`, "GET", {token})
}

export const getAnnouncementDetail = (announcementId, token) => {
  return request(`${baseUrl}b/announcement/detail/${announcementId}`, "GET", {token});
}