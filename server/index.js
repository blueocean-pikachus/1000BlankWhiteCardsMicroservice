const { instrument } = require('@socket.io/admin-ui');
const mysql = require('mysql2');
const io = require("socket.io")(8080, {
  cors: {
    origin: ["http://localhost:3000", "https://admin.socket.io"],
  },
})
const pass = require('./config');

const dbConnection = mysql.createConnection({
  user: 'root',
  password: pass,
  database: 'BlankCards',
});

io.on("connection", socket => {
  console.log(socket.id);

  socket.on("add-player", (name) => {
    dbConnection.query('SELECT * FROM players', (err, players) => {
      if (err) {
        console.log('error');
      } else {
        if (players.length < 4) {
          dbConnection.query(`INSERT INTO players (socketID, name) VALUES (?, ?)`, [socket.id, name], (err, players) => {
            if (err) {
              console.log(err);
            } else {
              dbConnection.query('SELECT * FROM players', (err, players) => {
                if (err) {
                  console.log(err);
                } else {
                  console.log(players);
                  io.emit("newPlayer", players);
                }
              })
            }
          })
        } else {
          io.emit("maxPlayers");
        }
      }
    })
  })

  socket.on("add-cards", (cards) => {

    let combinedQuery = "";

    for (let i = 0; i < cards.length; i++) {
      combinedQuery = combinedQuery + `('${cards[i]}', 'deck'), `;
    }
    combinedQuery = combinedQuery.slice(0, combinedQuery.length - 2);

    dbConnection.query(`INSERT INTO cards (url, position) VALUES ${combinedQuery}`, (err, cards) => {
      if (err) {
        console.log(err);
      } else {
        dbConnection.query('SELECT * FROM cards', (err, cards) => {
          if (err) {
            console.log(err);
          } else {
            console.log(cards);
            io.emit("card-list", cards);
          }
        })
      }
    })
  })

  socket.on("get-cards", () => {
    dbConnection.query('SELECT * FROM cards', (err, cards) => {
      if (err) {
        console.log('error');
      } else {
        console.log(cards);
        io.emit("card-list", cards);
      }
    })
  })

  socket.on("get-players", () => {
    dbConnection.query('SELECT * FROM players', (err, players) => {
      if (err) {
        console.log('error');
      } else {
        console.log(players);
        io.emit("player-list", players);
      }
    })
  })

  socket.on("move-card", (id, position) => {
    console.log('move-card');
    console.log(id, position);
    dbConnection.query('UPDATE cards SET position = ? WHERE id = ?', [position, id], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        dbConnection.query('SELECT * FROM cards', (err, cards) => {
          if (err) {
            console.log('error');
          } else {
            console.log(cards);
            io.emit("card-list", cards);
          }
        })
      }
    })
  })

  socket.on("end-game", (cards) => {
    dbConnection.query('DELETE FROM cards', (err, cards) => {
      if (err) {
        console.log('error');
      }
    })
    dbConnection.query('DELETE FROM players', (err, cards) => {
      if (err) {
        console.log('error');
      }
    })
    socket.disconnect();
  })
})

instrument(io, {auth: false})