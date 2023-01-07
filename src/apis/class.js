import axios from "../utils/axios";



export const getListClass = () => {
    return axios.get("classes")
}

export const getClassById = (id) => {
    return axios.get("class/" + id)
}

export const createClass = (data) => {
    return axios.post("classes", data)
}

export const updateClassById = (classId, data) => {
    return axios.put("class/" + classId, data)
}

export const deleteClassById = (classId) => {
    return axios.delete("class/" + classId)
}
