import { get } from '../lib/HTTP';

export function getGHUserFromAPI(user: String) {
    return get(`https://api.github.com/users/${user}`);
}