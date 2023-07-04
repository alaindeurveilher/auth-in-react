import express, { Express } from 'express';
import fallback from './fallback.routes';
import welcome from './welcome.routes';
import publicItems from './public-items.routes';
import privateItems from './private-items.routes';
import login from './login.routes';

function routesConfig(app: Express) {
  app.use(express.json());
  app.use('/', welcome);
  app.use('/api/login', login);
  app.use('/api/public-items', publicItems);
  app.use('/api/private-items', privateItems);
  app.use('*', fallback);
} 

export default routesConfig;
