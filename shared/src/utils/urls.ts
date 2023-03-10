import { URLS } from "@/interface";

export const getURLs = ({ protocoll }: { protocoll: string }): URLS => {
  const serverPort: string | undefined = process.env.NEXT_PUBLIC_SERVER_PORT;
  const clientPort: string | undefined = process.env.NEXT_PUBLIC_CLIENT_PORT;
  const displayPort: string | undefined = process.env.NEXT_PUBLIC_DISPLAY_PORT;

  const serverURL = new URL(`${protocoll}localhost:${serverPort}`);
  const clientURL = new URL(`${protocoll}localhost:${clientPort}`);
  const displayURL = new URL(`${protocoll}localhost:${displayPort}`);
  return {
    serverURL,
    clientURL,
    displayURL,
    serverPort,
    clientPort,
    displayPort,
  };
};
