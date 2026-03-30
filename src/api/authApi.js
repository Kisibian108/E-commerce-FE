import axiosClient from "./axiosClient";

export const authApi = {
    login: (data) => axiosClient.post("/login", data),
    register: (data) => axiosClient.post("/register", data),
    forgotPassword: (data) => axiosClient.post("/forgot-password", data),
    changePassword: (data) => axiosClient.post("/change-password", data),
};
