import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { connectDB } from './config/db.js';

dotenv.config();

const PORT = process.env.PORT? process.env.PORT : 5000;

const app = express();
app.use(bodyParser.json());

app.use('/api/products', require('./routes/product.route.js'));

app.listen(PORT, () => {
    console.log(`Servidor se ejecuto en la url: http://localhost:${PORT}`);
    connectDB(process.env.URI_DB);
});