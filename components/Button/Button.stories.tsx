import React from 'react';
import Button, { ButtonProps, Sizes } from './Button';
import { Story, Meta } from '@storybook/react';
import { withTranslation } from 'react-i18next';

export default {
  title: 'Components/Button',
  component: Button,
} as Meta;

const ButtonTranslated = withTranslation('components/button')(Button);

const Template: Story<ButtonProps> = (args: ButtonProps) => <ButtonTranslated {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  label: 'Button',
  size: Sizes.BIG,
};
Primary.argTypes = {
  size: { control: { type: 'select', options: ['Big', 'Normal', 'Small'] } },
};
