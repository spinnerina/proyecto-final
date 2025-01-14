import express from 'express';
import bodyParser from 'body-parser';
import { connectDB } from './src/config/db.js';
import { productRouter } from './src/routes/product.route.js';
import { authRoute } from './src/routes/auth.route.js';
import cors from "cors";

process.loadEnvFile();

const PORT = process.env.PORT? process.env.PORT : 5000;

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use('/api/products', productRouter);
app.use('/api/auth', authRoute);

app.use("*", (req, res) => {
    res.status(404).json({ error: "Resource not found" })
});

app.listen(PORT, () => {
    console.log(`Servidor se ejecuto en la url: http://localhost:${PORT}`);
    connectDB(process.env.URI_DB);
});