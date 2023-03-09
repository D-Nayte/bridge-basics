import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { getURLs } from "@shared/src/utils/urls";
import { players } from "@shared/src/lib/players";

export default function App({ Component, pageProps }: AppProps) {
  const [urls, seturls] = useState({});
  useEffect(() => {
    if (typeof window !== undefined) {
      // get protocoll(http,https) from browser
      const protocoll = window.location.protocol;
      console.log("players :>> ", players);
      // getURLs({ protocoll, ENV: process.env });
    }
  }, []);
  return <Component {...pageProps} />;
}
