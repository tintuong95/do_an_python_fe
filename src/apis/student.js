import axios from "../utils/axios";

export const getListStudent = () => {
    return axios.get("students")
}

export const getStudentById = (id) => {
    return axios.get("student/" + id)
}

export const createStudent = (data) => {
    return axios.post("students", data)
}

export const updateStudentById = (studentId, data) => {
    return axios.put("student/" + studentId, data)
}

export const deleteStudentById = (studentId) => {
    return axios.delete("student/" + studentId)
}
