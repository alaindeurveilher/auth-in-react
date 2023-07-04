import express, { Express } from 'express';
import routesConfig from './routes';
import cors, { CorsOptions } from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app: Express = express();

const CORS_OPTIONS: CorsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
};
app.options('*', cors());
app.use(cors(CORS_OPTIONS));

routesConfig(app);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
