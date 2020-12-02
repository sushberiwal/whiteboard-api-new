const express = require("express");
const app = express();
const cors = require('cors')
app.use(cors());


app.use(express.static('public'));


const http = require("http").createServer(app);
const io = require("socket.io")(http , {cors: {
  origin: '*',
}});
// io pe => event listen


io.on("connection", function (socket) {
  console.log(`${socket.id} connected`);

  socket.on("mousedown", function (data) {
    socket.broadcast.emit("md", data);
  });

  socket.on("mousemove" , function(data){
    socket.broadcast.emit("mm" , data);
  })
});

app.get("/", function (req, res) {
  res.redirect("/index.html");
});

let port = process.env.PORT || 3000;

// app => api => server
http.listen( port , () => {
  console.log("listening on *:3000");
});
