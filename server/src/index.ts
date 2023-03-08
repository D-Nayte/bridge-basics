import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

import { Server, Origins } from "../node_modules/boardgame.io/server";
import { Bridge } from "../../shared/lib/Bridge";

const server = Server({
  games: [Bridge],
  origins: [
    // Allow localhost to connect, except when NODE_ENV is 'production'.
    Origins.LOCALHOST_IN_DEVELOPMENT,
  ],
});

const port: number = parseInt(process.env.SERVER_PORT);
server.run(port);
