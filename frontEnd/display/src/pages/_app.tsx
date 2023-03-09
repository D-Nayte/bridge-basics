import "@shared/styles/global.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [urls, seturls] = useState({});
  useEffect(() => {
    if (typeof window !== undefined) {
      // get protocoll(http,https) from browser
      const protocoll = window.location.protocol;

      // getURLs({ protocoll, ENV: process.env });
    }
  }, []);
  return <Component {...pageProps} />;
}
