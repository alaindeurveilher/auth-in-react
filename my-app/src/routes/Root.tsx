import { Outlet, useLoaderData } from 'react-router-dom';
import { getPublicItems } from '../lib/data/public';
import Header from '../components/header/Header';
import { Item } from '../models/item';

interface LoaderData {
  items: Item[];
}

export async function loader(): Promise<LoaderData> {
  const items: Item[] = await getPublicItems();
  return { items };
}

export default function Root() {
  const { items } = useLoaderData() as LoaderData;

  return (
    <div className="">
      <Header />
      <div className="p-8">
        <Outlet />
      </div>
    </div>
  );
}