import { URLS } from "@interface";

export const getURLs = (protocol: string): URLS => {
  const prodMode = process.env.NEXT_PUBLIC_NODE_ENV === "production";
  const k8sAdress = process.env.NEXT_PUBLIC_Server_ADDRESS;
  const devDomain = process.env.NEXT_PUBLIC_DEV_IP;
  console.log("protocol :>> ", protocol);
  const serverPort: string | undefined = process.env.NEXT_PUBLIC_SERVER_PORT;
  const clientPort: string | undefined = process.env.NEXT_PUBLIC_CLIENT_PORT;
  const displayPort: string | undefined = process.env.NEXT_PUBLIC_DISPLAY_PORT;

  const serverAddress = prodMode
    ? `${protocol}server.${k8sAdress}`
    : `${protocol}${devDomain}:${serverPort}`;
  const clientAddress = prodMode
    ? `${protocol}client.${k8sAdress}`
    : `${protocol}${devDomain}:${clientPort}`;
  const displayAddress = prodMode
    ? `${protocol}${k8sAdress}`
    : `${protocol}${devDomain}:${displayPort}`;

  const serverURL = new URL(serverAddress);
  const clientURL = new URL(clientAddress);
  const displayURL = new URL(displayAddress);
  return {
    serverURL,
    clientURL,
    displayURL,
    serverPort,
    clientPort,
    displayPort,
  };
};
