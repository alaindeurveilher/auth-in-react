import { AiOutlineEye, AiOutlineLock } from 'react-icons/ai';
import { Link } from 'react-router-dom';

export default function Navigation() {
  return (
    <nav className="flex items-center justify-between w-auto">
      <ul className="flex items-center gap-8 p-0 mt-0 font-medium border border-gray-100 rounded bg-gray-50 flex-row border-0 bg-white">
        <li className="">
          <Link to="/public" className="flex items-center gap-1 py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0">
            <AiOutlineEye />
            Public
          </Link>
        </li>
        <li className="">
          <Link to="/private" className="flex items-center gap-1 py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0">
            <AiOutlineLock />
            Private
          </Link>
        </li>
      </ul>
    </nav>
  );
}