import update from 'react-addons-update';
import {PROFILE_LOAD} from "../actions/profileActions";

const backendData = {
    user: 'Грета Тумблер',
    userSocialActivity: 'Активистка'
};

const initialStore = {};

export default function profileReducer(store = initialStore, action) {
    if (action.type === PROFILE_LOAD) {
        return update(store, {
            user: {$set: backendData.user},
            userSocialActivity: {$set: backendData.userSocialActivity}
        });

        }
    return store;
}


