export const getURLs = ({
  protocoll,
  ENV,
}: {
  protocoll: string;
  ENV: any;
}) => {
  console.log("ENV :>> ", ENV);
  const serverPort: String | undefined = ENV.NEXT_PUBLIC_SERVER_PORT;
  const clientPort: String | undefined = ENV.NEXT_PUBLIC_CLIENT_PORT;
  const displayPort: String | undefined = ENV.NEXT_PUBLIC_DISPLAY_PORT;
  const baseURL = new URL(`${protocoll}localhost:${serverPort}`);
};
