import Document, { Head, Main, NextScript } from 'next/document';
import { redirectOnServer } from 'utils';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const { req, res } = ctx;
    if (req.url === ADMIN_BASE || req.url === `${ADMIN_BASE}/`) {
      redirectOnServer({ res, url: `${ADMIN_BASE}/dashboard` });
    }
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <html lang="vi">
        <Head>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta name="viewport" content="width=1270" />
          <script src="/static/scripts/perfume.js" />
          <link rel="manifest" href="/static/manifest.json" />
          <link rel="apple-touch-icon" href="/static/icons/apple-touch-icon.png" />
          <link rel="icon" href="/static/icons/favicon.ico" />
        </Head>
        <body>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                const perfume = new Perfume({
                  timeToInteractive: true,
                });
            `
            }}
          />
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
