import React from "react";
import { Metadata } from "next";
import './styles/globals.css'
import { getSettings} from "../sanity/lib/sanity.client";
import { getMetadata } from "../components/elements/Metadata";
import {SizeProvider} from '../contexts/SizeContext'


export async function generateMetadata(): Promise<Metadata> {
    const settings = await getSettings();
    if(!settings || !settings.settings || !settings.settings.defaultseo) return
    return getMetadata(settings.settings.defaultseo);
}

export default async function RootLayout({ children }) {

    return (
      <html lang="de">
        <head>
          <link rel="shortcut icon" href="/favicon/favicon.ico" />
          <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link rel="stylesheet" href="https://use.typekit.net/hxi6dsv.css"></link>
        </head>
        <body>
          <SizeProvider>
          {children}
        </SizeProvider>
       
        </body>
      </html>
    );
  }
  