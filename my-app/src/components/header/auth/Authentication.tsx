import { AiOutlinePoweroff } from 'react-icons/ai';
import { Link } from 'react-router-dom';

export default function Authentication() {
  const handleLogout = (): void => {
    localStorage.removeItem('token');
  };

  return (
    <div className="flex items-center gap-2">
      <Link
        to="auth/signin"
        className="flex items-center gap-1 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded text-sm px-3 py-2"
      >
        <AiOutlinePoweroff />
        Sign In
      </Link>
      
      <button
        onClick={handleLogout}
        type="button"
        className="flex items-center gap-1 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded text-sm px-3 py-2"
      >
        <AiOutlinePoweroff />
        Logout
      </button>
    </div>
  );
}