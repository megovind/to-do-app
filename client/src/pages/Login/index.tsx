import LoginForm from '../../components/LoginForm';
import { userLogin } from '../../services/users';
import { QueryClient, useMutation } from '@tanstack/react-query';
import { setLocalStorageItem } from '../../config/local-storage';
import { useNavigate } from '@tanstack/react-router';
const queryClient = new QueryClient();
function LoginPage() {
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

  return (
    <div className='container mx-auto p-4'>
        <div className="flex items-center justify-center mt-20">
            <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold my-10 text-left">Login</h1>
                <LoginForm onSubmit={handleLogin} />
            </div>
        </div>
     </div>   
  );
}

export default LoginPage;
