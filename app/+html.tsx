import { ScrollViewStyleReset } from "expo-router/html";
import type { PropsWithChildren } from "react";

import { robotsMetaContent } from "../src/seo/searchIndexing";

export default function Root({ children }: PropsWithChildren) {
  const robots = robotsMetaContent();
  return (
    <html lang="ja" style={{ height: "100%" }}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta name="robots" content={robots} />
        <meta name="googlebot" content={robots} />
        <ScrollViewStyleReset />
        <style
          dangerouslySetInnerHTML={{
            __html: `
              html, body, #root {
                height: 100%;
                width: 100%;
                margin: 0;
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
