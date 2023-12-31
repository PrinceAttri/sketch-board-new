const express = require("express");
const socket = require("socket.io");

const app = express();

app.use(express.static("../Sketch Board"));

let port = process.env.PORT || 3000;
let server = app.listen(port, () => {
    console.log("Listening to port " + port);
});

let io = socket(server);

io.on("connection", (socket) => {
    console.log("Made socket connection");

    //received data
    socket.on("beginPath", (data) => {
        //data from frontend
        //now transfer data to all connected computers
        io.sockets.emit("beginPath", data);
    });

    socket.on("drawStroke", (data) => {
        io.sockets.emit("drawStroke", data);
    });

    socket.on("redoUndo", (data) => {
        io.sockets.emit("redoUndo", data);
    });
}); 