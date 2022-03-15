import io from "socket.io-client";

let socket = io("https://rooms.spids.cl");

export default socket;
