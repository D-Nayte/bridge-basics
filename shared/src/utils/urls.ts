import { URLS } from "@interface";

export const getURLs = ({ protocoll }: { protocoll: string }): URLS => {
  const serverPort: string | undefined = process.env.NEXT_PUBLIC_SERVER_PORT;
  const clientPort: string | undefined = process.env.NEXT_PUBLIC_CLIENT_PORT;
  const displayPort: string | undefined = process.env.NEXT_PUBLIC_DISPLAY_PORT;
  const serverAdress = process.env.NEXT_PUBLIC_Server_ADDRESS;

  const serverURL = new URL(`${serverAdress}:${serverPort}`);
  const clientURL = new URL(`${serverAdress}:${clientPort}`);
  const displayURL = new URL(`${serverAdress}:${displayPort}`);
  return {
    serverURL,
    clientURL,
    displayURL,
    serverPort,
    clientPort,
    displayPort,
  };
};
