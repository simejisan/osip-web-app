import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';
import Settings from './Settings';
import Auth from './Auth';
import Function from './Function';
import Role from './Role';
import Hotwords from './Hotwords';
import Account from './Account'
import Promotion from './Promotion'
import Suggestion from "./Suggestion";
import Favorite from "./Favorite";
import Flashsale from "./Flashsale";

export default (history) => combineReducers({
    router: connectRouter(history),
    settings: Settings,
    auth: Auth,
    func: Function,
    role: Role,
    hotwords: Hotwords,
    account: Account,
    promotion: Promotion,
    suggestion: Suggestion,
    favorite: Favorite,
    flashsale: Flashsale
});
