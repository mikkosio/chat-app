const socket = io();

const button = document.getElementById("send-btn");
const inputBox = document.getElementById("input");
const chatBox = document.getElementById("chat-box")

button.addEventListener("click", () => {
    const message = inputBox.value;
    
    if (message) {
        socket.emit("message", message);
        inputBox.value = "";
    }
})

socket.on("message", (client, msg) => {
    const date = new Date()

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const period = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;

    const timestamp = `${day}/${month}/${year} ${hours}:${minutes} ${period}`;

    const messageItem = document.createElement("li");
    messageItem.innerHTML = `
        <div class="message">
            <span class="username">${client}</span>
            <span class="message-timestamp">${timestamp}</span>

            <div>${msg}</div>
        </div>
    `

    chatBox.appendChild(messageItem);
})