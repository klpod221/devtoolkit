import "../styles/globals.css";

import Head from "next/head";

import Layout from "@/components/layouts/Layout";

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Welcome | Developer Toolkit by klpod221</title>
      </Head>

      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
};

export default MyApp;
