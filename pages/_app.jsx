import React from "react";

import "@/styles/globals.css";
import "@/styles/html-preview.css";
import "react-toastify/dist/ReactToastify.css";

import Head from "next/head";

import Provider from "@providers";

import Layout from "@/components/layouts/Layout";
import { Analytics } from "@vercel/analytics/react";

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>
          {Component.title
            ? Component.title + " | DevTools by klpod221"
            : "DevTools by klpod221"}
        </title>
        <meta
          name="description"
          content="Collection of tools for developers. Web development tools, Image tools, Text tools, Password tools, Number tools, Time tools, Color tools, and more."
        />
      </Head>

      <Provider>
        <Layout title={Component.title}>
          <Component {...pageProps} />
          <Analytics />
        </Layout>
      </Provider>
    </>
  );
};

export default MyApp;
