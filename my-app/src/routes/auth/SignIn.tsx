import { Form, redirect } from 'react-router-dom';
import { authSignIn } from '../../lib/auth';
import { Credentials } from '../../models/credentials';

export async function action({request, params}: any) {
  const formData: FormData = await request.formData();
  const credentials: Credentials = Object.fromEntries(formData) as unknown as Credentials;
  await authSignIn(credentials);
  return redirect('/');
}

export default function SignInPage() {
  
  return (
    <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
      <Form
        method="post"
        className="space-y-6"
      >
        <h5 className="text-xl font-medium text-gray-900">Sign in</h5>
        <div>
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
          <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="good@example.com" defaultValue="good@example.com" required />
          <p className="mt-2 text-sm text-gray-500">Use any email starting with '<b>good@</b>' to successfully log in.</p>
        </div>
        <div>
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Your password</label>
          <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" defaultValue="good" required />
          <p className="mt-2 text-sm text-gray-500">Use the password '<b>good</b>' to successfully log in.</p>
        </div>
        <button
          type="submit"
          className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Login
        </button>
      </Form>
    </div>
  );
}