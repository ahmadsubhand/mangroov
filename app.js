import e from "express";
import { createServer } from "http";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import Router from "./src/api/routes/index.route.js";
import errorHandler from "./src/api/middlewares/errorHandler.js";

dotenv.config();

const app = e();
const server = createServer(app);

const allowedOrigins = [
    `${process.env.CLIENT_URL || 'http://localhost:5173'}`,
    ...(process.env.NODE_ENV !== 'production' ? ['http://localhost:5173'] : [])
]

app.use(e.json());
app.use(e.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(cors({ origin: allowedOrigins, credentials: true }));

if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined'));
} else {
  app.use(morgan('dev'));
}

app.get('/', (req, res) => {
    res.send('Homepage')
})

Router(app);

app.use(errorHandler);

let port = process.env.PORT || 3000;
let url = process.env.BASE_URL || `http://localhost:3000`;

server.listen(port, '0.0.0.0', () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode at ${url}`);
})