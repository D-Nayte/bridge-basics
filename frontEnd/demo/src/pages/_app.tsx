import "@shared/styles/global.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { getURLs } from "@shared/utils/urls";
import { URLS } from "@interface";

export default function App({ Component, pageProps }: AppProps) {
  const [urls, seturls] = useState<URLS | null>(null);

  useEffect(() => {
    if (typeof window !== undefined) {
      // get protocoll(http,https) from browser
      const protocol = window.location.protocol;
      const urls: URLS = getURLs(protocol);
      seturls(urls);
    }
  }, []);

  if (!urls) return;

  return <Component {...pageProps} urls={urls} />;
}
