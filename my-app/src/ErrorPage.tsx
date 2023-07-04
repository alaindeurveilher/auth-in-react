import { AiOutlineEye } from 'react-icons/ai';
import { BsExclamationTriangle } from 'react-icons/bs';
import { Link, useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const error: any = useRouteError();

  return (
    <div className="p-4 mb-4 text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">
      <div className="flex items-center">
        <BsExclamationTriangle className="w-5 h-5 mr-2"/>
        <span className="sr-only">Error</span>
        <h3 className="text-lg font-medium">Oops, sorry an unexpected error has occurred.</h3>
      </div>
      <div className="mt-2 mb-4 text-sm">
        {error.statusText || error.message}
      </div>
      <div className="flex">
        <button type="button" className="text-white bg-red-800 hover:bg-red-900 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs px-3 py-1.5 mr-2 text-center inline-flex items-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
          <AiOutlineEye className="-ml-0.5 mr-2 h-4 w-4" />
          View more
        </button>
        <Link to="/" className="text-red-800 bg-transparent border border-red-800 hover:bg-red-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:hover:bg-red-600 dark:border-red-600 dark:text-red-500 dark:hover:text-white dark:focus:ring-red-800" data-dismiss-target="#alert-additional-content-2" aria-label="Close">
          Dismiss
        </Link>
      </div>
    </div>
  );
}