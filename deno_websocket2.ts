import { WebSocketClient, WebSocketServer } from "https://deno.land/x/websocket@v0.1.4/mod.ts";
const wss = new WebSocketServer(8080);
wss.on("connection", async function (ws: WebSocketClient) {
  console.log("Client connected");
  ws.send("asdf")
});