import { ScrollViewStyleReset } from "expo-router/html";
import type { PropsWithChildren } from "react";

import { robotsMetaContent } from "../src/seo/searchIndexing";

export default function Root({ children }: PropsWithChildren) {
  const robots = robotsMetaContent();
  return (
    <html lang="ja">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no, viewport-fit=cover, interactive-widget=resizes-content"
        />
        <meta name="robots" content={robots} />
        <meta name="googlebot" content={robots} />
        <ScrollViewStyleReset />
        <style
          dangerouslySetInnerHTML={{
            __html: `
              html, body {
                height: 100%;
                height: 100dvh;
                width: 100%;
                margin: 0;
                overflow: hidden;
              }
              /* Pin to the visible viewport so mobile browser chrome
                 (URL / toolbar) does not cover fixed header/footer. */
              #root {
                position: fixed;
                inset: 0;
                width: 100%;
                height: 100%;
                height: 100dvh;
                max-height: 100dvh;
                overflow: hidden;
              }
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
