import api from "./axiosInstance";

export const getAllMaaslar = () => {
    return api.get("/rest/api/maas/list");
};

export const hesaplaMaas = (personelId, donem) => {
    return api.post(`/rest/api/maas/hesapla/${personelId}?donem=${donem}`);
};

export const getMaasByDonem = (donem) => {
    return api.get(`/rest/api/maas/donem?donem=${donem}`);
};

export const deleteMaas = (id) => {
    return api.delete(`/rest/api/maas/delete/${id}`);
};