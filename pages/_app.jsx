import "@/styles/globals.css";

import Head from "next/head";

import Layout from "@/components/layouts/Layout";
import { ThemeProvider } from "@/providers/ThemeProvider";

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>
          {Component.title
            ? Component.title + " | DevToolkit by klpod221"
            : "DevToolkit by klpod221"}
        </title>
        <meta
          name="description"
          content="Collection of tools for developers. Web development tools, Image tools, Text tools, Password tools, Number tools, Time tools, Color tools, and more."
        />
      </Head>

      <ThemeProvider>
        <Layout title={Component.title}>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </>
  );
};

export default MyApp;
