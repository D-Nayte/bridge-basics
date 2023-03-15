import "@shared/styles/global.css";
import "../style/globalClient.css";
import { useEffect, useState } from "react";
import Layout from "@clientComponents/Layout";
import type { AppProps } from "next/app";
import { URLS } from "@interface";
import { getURLs } from "@shared/utils/urls";

export default function App({ Component, pageProps }: AppProps) {
  const [urls, seturls] = useState<URLS | null>(null);

  useEffect(() => {
    if (typeof window !== undefined) {
      // get protocoll(http,https) from browser
      const protocoll = window.location.protocol;
      const urls: URLS = getURLs({
        protocoll,
      });
      seturls(urls);
    }
  }, []);

  if (!urls) return;
  return (
    <>
      <Layout>
        <Component {...pageProps} urls={urls} />
      </Layout>
    </>
  );
}
