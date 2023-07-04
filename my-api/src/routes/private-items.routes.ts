import express, {Router, Request, Response} from 'express';
import isAuthenticated from '../middleware/auth.middleware';

interface Item {
  id: number;
  name: string;
}

const router: Router = express.Router();

const DUMMY_ITEMS: Item[] = [
  { id: 1, name: 'private item 1' },
  { id: 2, name: 'private item 2' },
  { id: 3, name: 'another private item' },
  { id: 4, name: 'something else, still private' }
];

router.get('/', isAuthenticated, (req: Request, res: Response) => {
  res.send(DUMMY_ITEMS);
});

router.get('/:itemId', isAuthenticated, (req: Request, res: Response) => {
  const itemId: string = req.params.itemId;
  const foundItem: Item | undefined = DUMMY_ITEMS.find((item) => item.id === +itemId);
  if (!foundItem) {
    res.status(404).send({message: 'The item with the given ID was not found'});
    return;
  }

  res.send(foundItem);
});

export default router;
