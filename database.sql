CREATE DATABASE boardz;

CREATE TABLE board(
  board_id SERIAL PRIMARY KEY,
  game VARCHAR(50),
  player VARCHAR(50),
  score INT
);

INSERT INTO board (game,player,score) VALUES ('hordez','Fred',15);
SELECT * FROM board;

--psql -U postgres
--/l
--/dt
--create the database then /c boardz to connect
--DROP TABLE board;
--heroku pg:psql