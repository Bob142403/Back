import express from "express";
import cors from "cors";
import { pool } from "./database/pool";
import auth from "./src/auth/auth.route";

const PORT = 5000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get("/", async (req, res, next) => {
  const client = await pool.connect();

  const response = await client.query("SELECT version()");
  console.log(response.rows[0]);

  res.status(200).json({
    message: "Running Node with Express and Typescript",
  });
});
app.use(auth);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}.`);
});
