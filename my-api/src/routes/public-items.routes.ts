import express, {Router, Request, Response} from 'express';

interface Item {
  id: number;
  name: string;
}

const router: Router = express.Router();

const DUMMY_ITEMS: Item[] = [
  { id: 1, name: 'item 1' },
  { id: 2, name: 'item 2' },
  { id: 3, name: 'another item' },
  { id: 4, name: 'something else' }
];

router.get('/', (req: Request, res: Response) => {
  res.send(DUMMY_ITEMS);
});

router.get('/:itemId', (req: Request, res: Response) => {
  const itemId: string = req.params.itemId;
  const foundItem: Item | undefined = DUMMY_ITEMS.find((item) => item.id === +itemId);
  if (!foundItem) {
    res.status(404).send({message: 'The item with the given ID was not found'});
    return;
  }

  res.send(foundItem);
});

export default router;
