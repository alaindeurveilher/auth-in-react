import axios from 'axios';
import { Item } from '../../models/item';

export async function getPublicItems(): Promise<Item[]> {
  // try {
    const {data} = await axios.get<Item[]>('http://localhost:3000/api/public-items');
    return data;
  // } catch (error: any) {
  //   throw new Error('An unexpected error occurred while fetching the public items');
  // }
};
