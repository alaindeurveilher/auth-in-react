import axios from 'axios';
import { Item } from '../../models/item';

export async function getPrivateItems(): Promise<Item[]> {
  const token: string | null = localStorage.getItem('token');
  // try {
    const {data} = await axios.get<Item[]>('http://localhost:3000/api/private-items', {
      headers: {
        'Authorization': token ? `Bearer ${token}` : undefined,
      },
    });
    return data;
  // } catch (error: any) {
  //   throw new Error('An unexpected error occurred while fetching the private items');
  // }
};
