import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, "../../.env") });
import { Server, Origins } from "../node_modules/boardgame.io/server";
import { Bridge } from "../../shared/src/lib/Bridge";
import { getServerIp } from "./utils";

const serverIp = getServerIp();
console.log("serverIp1 :>> ", serverIp);

const port: number = parseInt(process.env.NEXT_PUBLIC_SERVER_PORT);

const server = Server({
  games: [Bridge],
  origins: [
    "http://192.168.178.20:3001",
    Origins.LOCALHOST,
    // Allow localhost to connect, except when NODE_ENV is 'production'.
    //Origins.LOCALHOST_IN_DEVELOPMENT,
  ],
});

server.router.post("/serverIp", (ctx, next) => {
  console.log("serverIp2 :>> ", serverIp);
  ctx.body = { serverIp: serverIp };
});

server.run(port);
