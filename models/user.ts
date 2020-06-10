import { Record } from 'immutable';

const UserRecord = {
    id: 0,
    name: "",
    avatar_url: "https://avatars2.githubusercontent.com/u/2840564?s=460&v=4"
}

export default class User extends Record(UserRecord) {
    constructor(props: any) {
        props ? super(props) : super();
    }
}