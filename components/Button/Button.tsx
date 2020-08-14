import React from 'react';
import { withTranslation } from '../../i18n';
import { WithTranslation } from 'next-i18next';

import styles from './Button.style';

export enum Sizes {
  BIG = 'Big',
  NORMAL = 'Normal',
  SMALL = 'Small',
}

export interface ButtonProps extends WithTranslation {
  label: string;
  size: Sizes;
}

const Button: React.FC<ButtonProps> = ({ label, size }: ButtonProps) => {
  return <button css={[styles.Button, styles[size]]}>{label}</button>;
};

export default withTranslation('components/button')(Button);
