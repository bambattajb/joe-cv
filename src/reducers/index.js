import {combineReducers} from 'redux';
import manageSections from './manageSections.reducer';
import Settings from './settings.reducer';
import hallOfFame from './hallOfFame.reducer';

const rootReducer = combineReducers({
    manageSections,
    Settings,
    hallOfFame
});

export default rootReducer;