import express, { json } from 'express';//use json instead of bodyParser
import cors from 'cors';
import pool from './db.js';


const app = express();
const PORT = process.env.PORT || 5000
var corsOptions = { origin: process.env.URL || '*' };

app.use(cors(corsOptions));
app.use(json());

app.get("/boardz", async (req, res) => {
  try {
    const allBoardz = await pool.query("SELECT * FROM board");
    res.json(allBoardz.rows);
  } catch (error) {
    console.log(error.message);
  }
})

app.listen(PORT, () => {
  console.log(`server has started on port:${PORT}`);
})