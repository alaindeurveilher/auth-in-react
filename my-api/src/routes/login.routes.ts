import express, {Router, Request, Response} from 'express';
import { SafeParseReturnType, z } from 'zod';
import jwt from 'jsonwebtoken';
import { JWT_ALGORITHM } from '../constants/jwt.constants';

const router: Router = express.Router();

const CredentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
});

type Credentials = z.infer<typeof CredentialsSchema>;
interface User {
  email: string;
  name: string;
}

router.post('/', (req: Request, res: Response) => {
  // data validation
  const credentials: Credentials = req.body;
  const validation: SafeParseReturnType<Credentials, Credentials> = CredentialsSchema.safeParse(credentials);
  if (!validation.success) {
    res.status(422).send({ message: validation.error.message ?? 'Invalid credentials' });
    return;
  }
  
  // usually here connect to the DB, check user exists, compare password etc.
  // ...
  // But, here we are going to fake it

  // If user does not exist
  const existingUser: User | null = credentials.email.startsWith('good@') ? { email: credentials.email, name: 'John Doe' } : null;
  if (!existingUser) {
    res.status(422).send({ message: 'Invalid credentials'});
    return;
  }

  // If wrong password
  if (credentials.password !== 'good') {
    res.status(422).send({ message: 'Invalid credentials'});
    return;
  }

  // create token with JWT:
  if (!process.env.JWT_TOKEN_SECRET) {
    res.status(500).send({ message: 'Server error, missing mandatory configuration'});
    return;
  }

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

export default router;
