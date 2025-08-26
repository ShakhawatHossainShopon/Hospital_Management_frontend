/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAccessToken } from '@/common/helpers/getToken';
import { envConfig } from '@/config/envConfig';
import axios from 'axios';
import Cookies from 'js-cookie';

export const loginService = async (userData: { email: string; password: string }) => {
    try {
        const response = await axios.post(`${envConfig.backendBaseUrl}auth/login`, userData); // Replace with your actual API endpoint
        const token = response.data.token;
        const userid = response.data.user_id;
        const admin_id = response.data.admin_id;
        const role = response.data.role;
        Cookies.set('accessToken', token, { secure: true, sameSite: 'strict' });
        Cookies.set('userid', userid, { secure: true, sameSite: 'strict' });
        Cookies.set('role', role, { secure: true, sameSite: 'strict' });
        Cookies.set('admin_id', admin_id, { secure: true, sameSite: 'strict' });
        if (response.data.status === true) {
            return response.data
        } else {
            console.log("user id not found");
        }
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Login failed');
    }
};


export const logOut = async () => {
    try {
        const token = getAccessToken();
        const response = await axios.post(
            `${envConfig.backendBaseUrl}auth/logout`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Logout failed');
    }
};
