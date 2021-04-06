CREATE DATABASE boardz;

CREATE TABLE board(
  board_id SERIAL PRIMARY KEY,
  game VARCHAR(50),
  player VARCHAR(50),
  score INT
);

INSERT INTO board (game,player,score) VALUES ('hordezee','Fred',15);
SELECT * FROM board;
SELECT * FROM board WHERE game = 'hordezee' ORDER BY score DESC
SELECT * FROM board WHERE game = 'hordezee' ORDER BY score DESC limit 3;
DELETE FROM board WHERE game = 'hordezee' AND board_id NOT IN (SELECT board_id FROM board WHERE game = 'hordezee' ORDER BY score DESC limit 3);

--psql -U postgres
--/l
--/dt
--create the database then /c boardz to connect
--DROP TABLE board;
--heroku pg:psql
--heroku logs --tail