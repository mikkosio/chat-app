const socket = io();
const button = document.getElementById("send-btn");
const inputBox = document.getElementById("input");

socket.on("connect", () => {
    console.log(`${socket.id} connected.`);
})

socket.on("disconnect", () => {
    console.log(`${socket.id} disconnected.`);
})

button.addEventListener("click", function() {
    const message = inputBox.value;
    
    if (message) {
        socket.emit("message", message);
    }
})