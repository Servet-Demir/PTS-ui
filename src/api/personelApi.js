import api from "./axiosInstance";

export const getAllPersoneller = () => {
    return api.get("/rest/api/personel/list");
};

export const savePersonel = (personel) => {
    return api.post("/rest/api/personel/save", personel);
};

export const updatePersonel = (id, personel) => {
    return api.put(`/rest/api/personel/update/${id}`, personel);
};

export const deletePersonel = (id) => {
    return api.delete(`/rest/api/personel/delete/${id}`);
};

export const getPersonelDonemOzeti = (personelId, donem) => {
    return api.get(`/rest/api/personel/${personelId}/mesai?donem=${donem}`);
};