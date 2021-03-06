import { Record } from 'immutable';

const GHUserRecord = {
  login: '',
  id: 0,
  node_id: '',
  avatar_url: 'https://avatars2.githubusercontent.com/u/2840564?s=460&v=4',
  gravatar_id: '',
  url: '',
  html_url: '',
  followers_url: '',
  following_url: '',
  gists_url: '',
  starred_url: '',
  subscriptions_url: '',
  organizations_url: '',
  repos_url: '',
  events_url: '',
  received_events_url: '',
  type: '',
  site_admin: false,
  name: '',
  company: '',
  blog: '',
  location: '',
  email: '',
  hireable: false,
  bio: '',
  twitter_username: '',
  public_repos: 0,
  public_gists: 0,
  followers: 0,
  following: 0,
  created_at: '',
  updated_at: '',
};

export default class GHUser extends Record(GHUserRecord) {
  constructor(props?: typeof GHUserRecord) {
    props ? super(props) : super();
  }
}
