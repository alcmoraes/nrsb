import Document, { Head, Main, NextScript, DocumentProps } from 'next/document'


interface Props extends DocumentProps {
  localeDataScript: any
  locale: any
}

// The document (which is SSR-only) needs to be customized to expose the locale
// data for the user's locale for React Intl to work in the browser.
export default class IntlDocument extends Document<Props> {
  static async getInitialProps(context: any) {
    const props = await super.getInitialProps(context)
    const {
      req: { locale, localeDataScript },
    } = context
    return {
      ...props,
      locale,
      localeDataScript,
    }
  }

  render() {
    // Polyfill Intl API for older browsers
    const polyfill = `https://cdn.polyfill.io/v3/polyfill.js?features=Intl.~locale.${this.props.locale}`

    return (
      <html>
        <Head>
          <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;700&family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet" />
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossOrigin="anonymous" />
        </Head>
        <body>
          <Main />
          <script src={polyfill} />
          <script
            dangerouslySetInnerHTML={{
              __html: this.props.localeDataScript,
            }}
          />
          <NextScript />
        </body>
      </html>
    )
  }
}