import * as React from 'react';
import { Button } from '@material-ui/core';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { connect } from 'react-redux';
import { NextPage } from 'next';
import { WithTranslation } from 'next-i18next';

import { i18n, withTranslation, Link } from '../i18n';
import { logoutUser } from '../reducers';
import Layout from '../components/Layouts';
import { Dispatch } from 'redux';

interface Props extends WithTranslation {
  onLogoutUser: () => void;
}

const IndexPage: NextPage<Props> = ({ t, onLogoutUser }: Props) => {
  return (
    <Layout>
      <div className='container'>
        <div className='jumbotron'>
          <h1 className='text-center'>{t('title')}</h1>
          <hr />
          <div className='row'>
            <div className='col-lg-12 text-right'>
              <ButtonGroup color='secondary'>
                <Button variant='contained' onClick={() => i18n.changeLanguage('br')}>
                  br
                </Button>
                <Button variant='contained' onClick={() => i18n.changeLanguage('en')}>
                  en
                </Button>
              </ButtonGroup>
            </div>
            <div className='col-lg-12 text-right mt-3'>
              <Link href='/ghub' as='/ghub'>
                <a>{t('ghub_user_fetcher')}</a>
              </Link>
              <br />
              <Button onClick={onLogoutUser}>{t('logout')}</Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    onLogoutUser: () => dispatch(logoutUser()),
  };
}

export default connect(null, mapDispatchToProps)(withTranslation('index')(IndexPage));
