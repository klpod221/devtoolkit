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

        <meta property="og:title" content="DevTools by klpod221" />
        <meta
          property="og:description"
          content="Collection of tools for developers. Web development tools, Image tools, Text tools, Password tools, Number tools, Time tools, Color tools, and more."
        />
        <meta property="og:image" content="/favicon.png" />
        <meta property="og:url" content="https://klpod221.github.io/" />
        <meta property="og:site_name" content="DevTools by klpod221" />
        <meta property="og:card" content="summary" />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:image" content="/favicon.png" />
        <meta name="twitter:title" content="DevTools by klpod221" />
        <meta
          name="twitter:description"
          content="Collection of tools for developers. Web development tools, Image tools, Text tools, Password tools, Number tools, Time tools, Color tools, and more."
        />

        <link rel="icon" href="/favicon.ico" />

        <ThemeModeScript />
      </Head>

      <body className="bg-gray-100 dark:bg-dark-secondary text-gray-900 dark:text-dark-text">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default MyDocument;
