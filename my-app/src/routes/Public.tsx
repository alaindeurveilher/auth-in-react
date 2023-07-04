import { useLoaderData } from 'react-router-dom';
import { getPublicItems } from '../lib/data/public';
import { Item } from '../models/item';

interface LoaderData {
  items: Item[];
}

export async function loader(): Promise<LoaderData> {
  const items: Item[] = await getPublicItems();
  return { items };
}

export default function PublicPage() {
  const { items } = useLoaderData() as LoaderData;
  
  return (
    <div className="flex flex-col gap-4">
      <h1>Public page</h1>
      <ul className="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg">
        {items.map((item) => (
          <li
            key={item.id}
            className="w-full px-4 py-2 border-b border-gray-200 rounded-t-lg"
          >
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
}