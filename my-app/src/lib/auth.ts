import axios from 'axios';
import { Credentials } from '../models/credentials';

export async function authSignIn(credentials: Credentials): Promise<null> {
  const {data} = await axios.post('http://localhost:3000/api/login', credentials);
  if (data.token) {
    localStorage.setItem('token', data.token);
  }
  return null;
}