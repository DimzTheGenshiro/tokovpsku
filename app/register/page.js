import AuthForm from '../../components/AuthForm';

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <AuthForm mode="register" />
    </div>
  );
}

