import {combineReducers} from 'redux';
import welcomeContent from './welcomeContent.reducer';
import hallOfFame from './hallOfFame.reducer';


const rootReducer = combineReducers({
    welcomeContent,
    hallOfFame
});

export default rootReducer;