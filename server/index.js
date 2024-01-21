import express from "express";
import todoRouter from './routers/todoRouter.js';

const app = express();
app.use(express.json());

app.get("/", (req, res) => res.send("Hello world."));

app.use("/", todoRouter);

const PORT = 5000;

app.listen(PORT, () => console.log(`The app start on ${PORT}`));