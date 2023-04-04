import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, "../../.env") });
import { Server, Origins } from "../../node_modules/boardgame.io/server";
import { Bridge } from "../../shared/src/lib/Bridge";

const port: number = parseInt(process.env.NEXT_PUBLIC_SERVER_PORT || "8080");

const server = Server({
  games: [Bridge],
  origins: [
    Origins.LOCALHOST_IN_DEVELOPMENT,
    Origins.LOCALHOST,
    /^https?:\/\/([^\s:\/]+)((?:\/|:)\S*)?$/i,
  ],
});

server.router.get("/", (ctx, next) => {
  ctx.body = "Server running!";
});

server.run(port);
