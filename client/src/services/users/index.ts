import { axiosInstance } from '../../config/baseConfiguration'

export const userLogin = async (user: {username: string, password: string}) => {
    const response = await axiosInstance.post('/auth/login', user);
    return response.data;
}