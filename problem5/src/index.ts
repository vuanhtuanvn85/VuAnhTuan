import express from 'express';
import bodyParser from 'body-parser';
import resourceRoutes from './routes/resourceRoutes';
import { initializeDb } from './models/resourceModel';

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use('/api', resourceRoutes);

initializeDb().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
});
