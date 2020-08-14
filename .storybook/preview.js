import i18n from './i18n';
import { I18nextProvider } from 'react-i18next';

export const decorators = [
  Story => {
    return (
      <I18nextProvider i18n={i18n}>
        <Story />
      </I18nextProvider>
    );
  },
];

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
};
