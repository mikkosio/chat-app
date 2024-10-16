const socket = io();

const button = document.getElementById("send-btn");
const inputBox = document.getElementById("input");
const chatBox = document.getElementById("chat-box")

button.addEventListener("click", () => {
    const message = inputBox.value;
    
    if (message) {
        socket.emit("message", message);
    }
})

socket.on("message", (client, msg) => {
    const item = document.createElement("li");
    item.textContent = `${client}: ${msg}`;

    chatBox.appendChild(item);
})