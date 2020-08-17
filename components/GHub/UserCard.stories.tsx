import React from 'react';
import UserCard, { UserCardProps } from './UserCard';
import { Story, Meta } from '@storybook/react';
import { withTranslation } from 'react-i18next';

export default {
  title: 'Components/Github Card',
  component: UserCard,
} as Meta;

const UserCardTranslated = withTranslation('components/ghub/user-card')(UserCard);

const Template: Story<UserCardProps> = (args: UserCardProps) => <UserCardTranslated {...args} />;

export const Default = Template.bind({});
Default.args = { username: 'alcmoraes' };
Default.argTypes = {
  username: {
    control: 'text',
  },
};
