import React from 'react';
import Document, { Head, Main, NextScript, DocumentProps } from 'next/document';

type Props = DocumentProps;

class IntlDocument extends Document<Props> {
  render(): JSX.Element {
    return (
      <html>
        <Head>
          <link
            href='https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;700&family=Roboto:wght@300;400;500;700&display=swap'
            rel='stylesheet'
          />
          <link
            rel='stylesheet'
            href='https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css'
            integrity='sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk'
            crossOrigin='anonymous'
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

export default IntlDocument;
