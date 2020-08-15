import Axios from 'axios';
import { GHUser } from '../../models';

export default class UserCardServices {
  public endpoint = 'https://api.github.com/users/';

  async getGithubUserByUsername(username: string): Promise<GHUser> {
    const response = await Axios.get(`${this.endpoint}${username}`);
    return new GHUser(response.data);
  }
}
