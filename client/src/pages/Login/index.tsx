import LoginForm from '../../components/LoginForm';
import { useUserHook } from '../../hooks/user-hook';

function LoginPage() {
 const { handleLogin } = useUserHook();
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
