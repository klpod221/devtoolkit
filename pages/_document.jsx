import React from "react";
import { Html, Head, Main, NextScript } from "next/document";
import { ThemeModeScript } from "flowbite-react";

const MyDocument = () => {
  return (
    <Html lang="en">
      <Head>
        <meta name="author" content="klpod221" />
        <meta
          name="keywords"
          content="klpod221, develop, web, website, developer, tools, devtools"
        />
        <meta httpEquiv="Permissions-Policy" content="interest-cohort=()" />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <meta name="google" content="notranslate" />
        <meta name="google-adsense-account" content="ca-pub-1467915015924466" />
        <meta
          data-n-head="ssr"
          data-hid="description"
          name="description"
          content="Collection of tools for developers. Web development tools, Image tools, Text tools, Password tools, Number tools, Time tools, Color tools, and more."
        />

        <meta property="og:title" content="klpod221 | Portfolio" />
        <meta property="og:description" content="klpod221 portfolio" />
        <meta property="og:image" content="/favicon.png" />
        <meta property="og:url" content="https://klpod221.github.io/" />
        <meta property="og:card" content="summary" />

        <link rel="icon" href="/favicon.png" />

        <ThemeModeScript />
      </Head>

      <body className="w-full bg-gray-100 dark:bg-gray-900">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default MyDocument;
