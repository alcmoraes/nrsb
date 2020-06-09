import * as React from "react"
import { Provider } from "react-redux"
import App from "next/app"
import { NextComponentType } from "next"
import { AppStore } from "../interfaces"
import { Router } from "next/router"
import nProgress from "nprogress"
import { createIntl, createIntlCache, RawIntlProvider } from 'react-intl'
import store from '../store';

import '@formatjs/intl-pluralrules/polyfill'
import '@formatjs/intl-pluralrules/dist/locale-data/en'
import '@formatjs/intl-pluralrules/dist/locale-data/br'

import 'isomorphic-unfetch';

import * as moment from 'moment-timezone';
moment.tz.setDefault( 'America/Sao_Paulo' );

const cache = createIntlCache()

let disableMobileMenu = () => {
    document.body.classList.remove('mobile-menu');
}

Router.events.on('routeChangeStart', () => { disableMobileMenu(); nProgress.start() })
Router.events.on('routeChangeComplete', () => { disableMobileMenu(); nProgress.done() })
Router.events.on('routeChangeError', () => { disableMobileMenu(); nProgress.done() })

interface Props extends AppStore {
    locale: any
    messages: any
}

class MyApp extends App<Props> {

    static async getInitialProps({ Component, ctx }: { Component: NextComponentType, ctx: any }) {
        let pageProps = {};
        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx)
        }
        const { req } = ctx
        let { locale, messages } = req || window.__NEXT_DATA__.props
        return { pageProps, locale, messages };
    }
    
    render() {
        const { Component, pageProps, router, locale, messages } = this.props;
        const intl = createIntl(
            {
                locale,
                messages,
            },
            cache
        )

        return (
            <Provider store={store}>
                <RawIntlProvider value={intl}>
                    <Component {...pageProps} key={router.route} />
                </RawIntlProvider >
            </Provider>
        );
    }

}

export default MyApp;