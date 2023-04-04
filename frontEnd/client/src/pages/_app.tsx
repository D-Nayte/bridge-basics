import "@shared/styles/global.css";
import "../style/globalClient.css";
import { useEffect, useState } from "react";
import Layout from "@clientComponents/Layout";
import type { AppProps } from "next/app";
import { URLS } from "@interface";
import { getURLs } from "@shared/utils/urls";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const [urls, seturls] = useState<URLS | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== undefined) {
      const protocol = window.location.protocol;
      const urls: URLS = getURLs(protocol);
      seturls(urls);
    }
  }, [router.isReady]);

  if (!urls) return;
  return (
    <>
      <Layout>
        <Component {...pageProps} urls={urls} />
      </Layout>
    </>
  );
}
