let socket;

const usernameContainer = document.getElementById("username-container")
const usernameInput = document.getElementById("username");
const joinBtn = document.getElementById("join-btn")

const chat = document.getElementById("chat");
const sendBtn = document.getElementById("send-btn");
const inputBox = document.getElementById("input");
const chatBox = document.getElementById("chat-box");

function joinChat() {
    const username = usernameInput.value.trim();

    if (username) {
        socket = io();
    
        usernameContainer.style.display = "none";
        chat.style.display = "flex";
    
        socket.emit("join", username)

        // handle message events
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

            chatBox.prepend(messageItem);
        })

        // handle system events
        socket.on("system", msg => {
            const messageItem = document.createElement("li");
            messageItem.innerHTML = `
                <div class="message">
                    <strong>${msg}</strong>
                </div>
            `

            chatBox.prepend(messageItem);
        })
    }
}

joinBtn.addEventListener("click", joinChat)
usernameInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        joinChat();
    }
})

function sendMessage() {
    const message = inputBox.value;

    if (message) {
        socket.emit("message", message);
        inputBox.value = "";
    }
}
sendBtn.addEventListener("click", sendMessage)
inputBox.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        sendMessage();
    }
})