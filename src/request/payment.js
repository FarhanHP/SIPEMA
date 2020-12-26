import { request, requestJson } from "."
import { baseUrl } from "../setting"

export const getPaymentTotal = (token)=>{
  return request(`${baseUrl}b/payment/get/total`, "GET", {token});
}

export const getAllPayment = (token, start, limit) =>{
  return request(`${baseUrl}b/payment/get/all/${start}/${limit}`, "GET", {token})
}

export const getPaymentByStudentId = (token, studentId, start, limit) => {
  return request(`${baseUrl}b/payment/get/s/${studentId}/${start}/${limit}`, "GET", {token})
}

export const createPayment = (token, studentId, amount, tanggal) => {
  return requestJson(`${baseUrl}b/payment/create/${studentId}`, "POST", {
    token,
    "Content-Type": "application/json" 
  }, {
    amount,
    tanggal
  })
}

export const editPayment = (token, paymentId, amount, tanggal) => {
  return requestJson(`${baseUrl}b/payment/edit/${paymentId}`, "PUT", {
    token, 
    "Content-Type": "application/json"
  }, {
    amount, 
    tanggal
  })
}

export const deletePayment = (token, paymentId) => {
  return request(`${baseUrl}b/payment/delete/${paymentId}`, "DELETE", {
    token
  });
}