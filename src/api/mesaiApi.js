import api from "./axiosInstance";

export const getAllMesailer = () => {
    return api.get("/rest/api/mesai/list");
};

export const getMesaiByPersonelAndDonem = (personelId, donem) => {
    return api.get(`/rest/api/mesai/personel/${personelId}?donem=${donem}`);
};

export const saveMesai = (mesai) => {
    return api.post("/rest/api/mesai/save", mesai);
};

export const updateMesai = (id, mesai) => {
    return api.put(`/rest/api/mesai/update/${id}`, mesai);
};

export const deleteMesai = (id) => {
    return api.delete(`/rest/api/mesai/delete/${id}`);
};