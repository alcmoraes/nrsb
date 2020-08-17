import * as React from 'react';
import { Provider } from 'react-redux';
import App from 'next/app';
import { NextComponentType, NextPageContext } from 'next';
import { appWithTranslation } from '../i18n';

import store from '../store';

import 'isomorphic-unfetch';

import * as moment from 'moment-timezone';
moment.tz.setDefault('America/Sao_Paulo');

class MyApp extends App {
  static async getInitialProps({ Component, ctx }: { Component: NextComponentType; ctx: NextPageContext }) {
    let pageProps: Record<string, unknown> = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps, router } = this.props;

    return (
      <Provider store={store}>
        <Component {...pageProps} key={router.route} />
      </Provider>
    );
  }
}

export default appWithTranslation(MyApp);
