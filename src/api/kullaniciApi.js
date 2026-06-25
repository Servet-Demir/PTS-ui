import api from "./axiosInstance";

export const login = (kullanici) => {
    return api.post("/rest/api/kullanici/login", kullanici);
};