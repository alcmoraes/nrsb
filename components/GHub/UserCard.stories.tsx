import React from 'react';
import UserCard, { UserCardProps } from './UserCard';
import { Story, Meta } from '@storybook/react';
import { GHUser } from '../../models';
import { withTranslation } from 'react-i18next';

export default {
  title: 'Components/Github Card',
  component: UserCard,
} as Meta;

const user = new GHUser({
  login: 'alcmoraes',
  id: 2521595,
  node_id: 'MDQ6VXNlcjI1MjE1OTU=',
  avatar_url: 'https://avatars1.githubusercontent.com/u/2521595?v=4',
  gravatar_id: '',
  url: 'https://api.github.com/users/alcmoraes',
  html_url: 'https://github.com/alcmoraes',
  followers_url: 'https://api.github.com/users/alcmoraes/followers',
  following_url: 'https://api.github.com/users/alcmoraes/following{/other_user}',
  gists_url: 'https://api.github.com/users/alcmoraes/gists{/gist_id}',
  starred_url: 'https://api.github.com/users/alcmoraes/starred{/owner}{/repo}',
  subscriptions_url: 'https://api.github.com/users/alcmoraes/subscriptions',
  organizations_url: 'https://api.github.com/users/alcmoraes/orgs',
  repos_url: 'https://api.github.com/users/alcmoraes/repos',
  events_url: 'https://api.github.com/users/alcmoraes/events{/privacy}',
  received_events_url: 'https://api.github.com/users/alcmoraes/received_events',
  type: 'User',
  site_admin: false,
  name: 'Alexandre',
  company: null,
  blog: '',
  location: 'Florianópolis - SC | Brazil',
  email: null,
  hireable: true,
  bio: null,
  twitter_username: null,
  public_repos: 23,
  public_gists: 10,
  followers: 24,
  following: 24,
  created_at: '2012-10-09T16:49:52Z',
  updated_at: '2020-08-12T21:27:33Z',
});

const UserCardTranslated = withTranslation('components/ghub/user-card')(UserCard);

const Template: Story<UserCardProps> = (args: UserCardProps) => <UserCardTranslated {...args} />;

export const Default = Template.bind({});
Default.args = { user };
Default.argTypes = {
  user: {
    control: { type: 'object' },
  },
};
