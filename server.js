const express = require("express")
const app = express()
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const port = process.env.PORT || 3000;

app.use(express.static("public"));

io.on("connection", client => {
    client.on("event", data => {
        console.log(data);
    })
    client.on("disconnect", () => {
        console.log(`${client} has left.`);
    })
})

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});