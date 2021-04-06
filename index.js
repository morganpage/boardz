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
    const allBoardz = await pool.query("SELECT * FROM board ORDER BY score DESC");
    res.json(allBoardz.rows);
  } catch (error) {
    console.log(error.message);
  }
})

app.get("/boardz/:game", async (req, res) => {
  try {
    const { game } = req.params;
    const boardGame = await pool.query("SELECT * FROM board WHERE game = $1 ORDER BY score DESC", [game]);
    res.json(boardGame.rows);
  } catch (error) {
    console.log(error.message);
  }
})

app.post("/boardz/:game", async (req, res) => {
  try {
    const { game } = req.params;
    const { player,score} = req.body;
    const boardGame = await pool.query(
      "INSERT INTO board (game,player,score) VALUES ($1,$2,$3) RETURNING *"
      , [game,player,score]);
    //Now delete everything except the top n scores for this game
    const del = await pool.query(
      'DELETE FROM board WHERE game = $1 AND board_id NOT IN (SELECT board_id FROM board WHERE game = $1 ORDER BY score DESC limit $2);',
      [game,3]
    );
    return res.json(boardGame.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
});


app.listen(PORT, () => {
  console.log(`server has started on port:${PORT}`);
})