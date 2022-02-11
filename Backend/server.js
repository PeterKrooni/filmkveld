import express from 'express'
import cors from 'cors'
import users from './api/users.route.js'

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/", users);
app.use("*", (req, res) => res.status(404).json({error: "Not found"}));

export default app;