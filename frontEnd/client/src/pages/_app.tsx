import "../styles/globals.css";
import { useEffect, useState } from "react";
import Layout from "@components/Layout";
import type { AppProps } from "next/app";
import { URLS } from "@shared/interface";
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
