import React from 'react';
import { Router, withTranslation } from '../i18n';
import { WithTranslation } from 'next-i18next';

interface Props extends WithTranslation {
  statusCode: number;
  namespacesRequired: string[];
}

function Error(props: Props) {
  const { statusCode, t } = props;

  return <p>{statusCode ? t(`${statusCode}`) : t('fallback')}</p>;
}

Error.getInitialProps = ({ res, req, err }: any) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  if (statusCode === 404) {
    if (req.url.match(/\/$/)) {
      const withoutTrailingSlash = req.url.substr(0, req.url.length - 1);
      if (res) {
        res.writeHead(303, {
          Location: withoutTrailingSlash,
        });
        res.end();
      } else {
        Router.push(withoutTrailingSlash);
      }
    }
  }
  return { statusCode, namespacesRequired: ['error'] };
};

export default withTranslation('error')(Error);
