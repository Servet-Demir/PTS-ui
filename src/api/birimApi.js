import api from "./axiosInstance";

export const getAllBirimler = () => {
    return api.get("/rest/api/birim/list");
};

export const saveBirim = (birim) => {
    return api.post("/rest/api/birim/save", birim);
};

export const updateBirim = (id, birim) => {
    return api.put(`/rest/api/birim/update/${id}`, birim);
};

export const deleteBirim = (id) => {
    return api.delete(`/rest/api/birim/delete/${id}`);
};