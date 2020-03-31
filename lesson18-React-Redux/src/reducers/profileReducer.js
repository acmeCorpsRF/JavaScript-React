import update from 'react-addons-update';
import {START_PROFILE_LOADING, SUCCESS_PROFILE_LOADING, ERROR_PROFILE_LOADING} from '../actions/profileActions';

const initialStore = {};

export default function profileReducer(store = initialStore, action) {
    switch (action.type) {
        case START_PROFILE_LOADING: {
            return update(store, {
                user: {$set: "Загрузка данных..."}
            });
        }
        case SUCCESS_PROFILE_LOADING: {
            const {user, userSocialActivity} = action.payload;
            return update(store, {
                user: {$set: user},
                userSocialActivity: {$set: userSocialActivity}
            });
        }
        case ERROR_PROFILE_LOADING: {
            return update(store, {
                user: {$set: "Загрузка данных..."}
            });
        }
        default:
            return store;
    }
}


