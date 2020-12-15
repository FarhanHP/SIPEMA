import { request } from "."
import { baseUrl } from "../setting"

export const getPaymentTotal = (token)=>{
  return request(`${baseUrl}b/payment/get/total`, "GET", {token});
}

export const getAllPayment = (token, start, limit) =>{
  return request(`${baseUrl}b/payment/get/all/${start}/${limit}`, "GET", {token})
}