import * as React from "react"
import { Provider } from "react-redux"
import App from "next/app"
import { NextComponentType } from "next"
import { appWithTranslation } from '../i18n'

import { AppStore } from "../interfaces"
import store from '../store';

import 'isomorphic-unfetch';

import * as moment from 'moment-timezone';
moment.tz.setDefault( 'America/Sao_Paulo' );

interface Props extends AppStore {
    locale: any
    messages: any
}

class MyApp extends App<Props> {

    static async getInitialProps({ Component, ctx }: { Component: NextComponentType, ctx: any }) {
        let pageProps: any = {};

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx)
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