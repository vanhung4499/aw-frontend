import {IChangePasswordRequest, IResetPasswordRequest, IUserLoginInput, IUserRegistrationInput} from "@/models";
import {axiosInstance} from "@/services";
import axios from "axios";

export const login = async (body: IUserLoginInput) => {
    return await axiosInstance.post('/auth/login', body);
}

export const logout = async () => {
    // TODO: Implement logout
}

export const register = async (body: IUserRegistrationInput) => {
    return await axiosInstance.post('/auth/register', body);
}

export const requestPassword = async (body: IResetPasswordRequest) => {
    return await axiosInstance.post('/auth/request-password', body);
}

export const resetPassword = async (body: IChangePasswordRequest) => {
    return await axiosInstance.post('/auth/reset-password', body);
}

export const emailVerification = async (token: string) => {
    return await axiosInstance.post('/auth/email/verify', {token});
}