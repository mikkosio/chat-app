const express = require("express")
const app = express()
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const port = process.env.PORT || 3000;

const users = {};
const activeUsernames = new Set();

app.use(express.static("public"));

io.on("connection", client => {
    client.on("check-username", username => {
        const resp = !(activeUsernames.has(username));
        
        client.emit("username-check-response", resp);
    })
    
    client.on("join", username => {
        console.log(`${username} has joined.`);
        
        users[client.id] = username;
        activeUsernames.add(username);

        io.emit("system", `${username} has joined the chat`)
    })

    client.on("message", msg => {
        console.log(`${client.id} says ${msg}`);

        const username = users[client.id] || "Unknown User"

        io.emit("message", username, msg)
    })
    
    client.on("disconnect", () => {
        const username = users[client.id]

        console.log(`${username} has left.`);

        if (username) {
            delete users[client.id]
            activeUsernames.delete(username)

            io.emit("system", `${username} has left the chat`)
        }
    })
})

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});