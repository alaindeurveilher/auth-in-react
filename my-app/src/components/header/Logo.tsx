import { AiOutlineHome } from 'react-icons/ai';
import { Link } from 'react-router-dom';

export default function Logo() {
  return (
    <div className="flex items-center">
      <Link to="/">
        <AiOutlineHome className="w-8 h-8" />
      </Link>
    </div>
  );
}