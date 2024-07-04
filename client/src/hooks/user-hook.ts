import { QueryClient, useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { userLogin } from '../services/users';
import { setLocalStorageItem } from '../config/local-storage';

const queryClient = new QueryClient();

export const useUserHook = () => {
    const navigate =useNavigate();
    const { mutateAsync, error } = useMutation({
        mutationFn: userLogin,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['userLogin'] });
        }
    });

    const handleLogin = async (username: string, password: string) => {
        const response = await mutateAsync({ username: username, password: password });
        if (error) {
            console.log('login failed:', error);
            return;
        }
        setLocalStorageItem('user', response);
        setLocalStorageItem('accessToken', response.accessToken);
        navigate({to: '/tasks'})
    };
    return {
        handleLogin
    }
}