# Authentication with React

## Backend: my-api

The backend is a simple Express REST API application providing:
- a public end point returning a list of items: `GET` `http://localhost:3000/api/public-items`
- a private end point returning a list of items, which requires authentication: `GET` `http://localhost:3000/api/private-items`
- an end point, simulating authentication, and returning in the body object the Jason web Token in the property `token`: `POST` `http://localhost:3000/api/login`

## Frontend: React app

- The React application has been built with Vite, and uses React Router Dom version 6.
- UI customization is performed with TailwindCSS

### Authentication

#### Sign In

- The login page is located at the route: `/auth/signin`
- Authentication in this example is made with an `email` and a `password`. Since there is no real connection to a database implemented in this demo, we simulate a successful login with the following credentials:
  - email: anything starting with `good@`
  - password: `good`
- Any other combination will either produce a 422 error
- The submission of the form ultimately perform a `POST` request with `axios` to `http://localhost:3000/api/login` passing the `email` and `password` in the body.

```jsx lines=[5] filename=src/lib/auth.ts
import axios from 'axios';
import { Credentials } from '../models/credentials';

export async function authSignIn(credentials: Credentials): Promise<null> {
  const {data} = await axios.post('http://localhost:3000/api/login', credentials);
  if (data.token) {
    localStorage.setItem('token', data.token);
  }
  return null;
}
```

- The server responds with an object containing:
  - a `message` property containing some text
  - a `token` property containing the generated JWT token

```jsx lines=[7-19] filename=src/routes/login.routes.ts
router.post('/', (req: Request, res: Response) => {
  // data validation
  const credentials: Credentials = req.body;
  
  // ...

  const token: string = jwt.sign(
    {
      email: credentials.email
    },
    process.env.JWT_TOKEN_SECRET,
    {
      algorithm: JWT_ALGORITHM,
      expiresIn: '1d',
      subject: credentials.email,
    }
  );

  res.status(200).send({ message: 'Authenticated succesfully', token });
});
```

- When the token is present in the response body, we save the token in the `localStorage` for later use when we need authentication

#### Accessing protected routes

- The page `/private` issues a `GET` request to the protected API `http://localhost:3000/api/private-items`
- This API expected to have a valid JWT token present in the header `Authorization`.
- To achieve that we pass to `axios` an options paramaters setting the headers according to the token present or not in localStorage:

````jsx lines=[4-6] filename=src/lib/data/private.ts
import axios from 'axios';
import { Item } from '../../models/item';

export async function getPrivateItems(): Promise<Item[]> {
  const token: string | null = localStorage.getItem('token');
    const {data} = await axios.get<Item[]>('http://localhost:3000/api/private-items', {
      headers: {
        'Authorization': token ? `Bearer ${token}` : undefined,
      },
    });
    return data;
};
```
