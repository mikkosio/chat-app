const express = require("express")
const app = express()
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const port = process.env.PORT || 3000;

const users = {};

app.use(express.static("public"));

io.on("connection", client => {
    client.on("join", username => {
        console.log(`${username} has joined.`);

        users[client.id] = username;

        io.emit("system", `${username} has joined the chat`)
    })

    client.on("message", msg => {
        console.log(`${client.id} says ${msg}`);

        const username = users[client.id] || "Unknown User"

        io.emit("message", username, msg)
    })
    
    client.on("disconnect", () => {
        const username = users[client.id] || "Unknown User"

        console.log(`${username} has left.`);

        io.emit("system", `${username} has left the chat`)
    })
})

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});