import "@shared/styles/global.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { getURLs } from "@shared/utils/urls";
import { URLS } from "@interface";

export default function App({ Component, pageProps }: AppProps) {
  const [urls, seturls] = useState<URLS | null>(null);

  useEffect(() => {
    if (typeof window !== undefined) {
      const urls: URLS = getURLs();
      seturls(urls);
    }
  }, []);

  if (!urls) return;

  return <Component {...pageProps} urls={urls} />;
}
