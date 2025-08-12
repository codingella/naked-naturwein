import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="de">
      <Head>
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}