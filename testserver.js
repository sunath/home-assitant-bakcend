const {WebSocket} = require("ws")

const socket = new WebSocket("ws://192.168.8.197")

socket.onopen = function () {
    socket.send('hellowrold');
    socket.onmessage = function (event) {
        console.log(event.data)
    }
}

