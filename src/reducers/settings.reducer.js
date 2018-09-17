import { RESET_CONTENT } from '../constants';
import Content from '../content.json';

const resetContent = () => {
    localStorage.setItem('sections', JSON.stringify(Content.Sections));
    localStorage.setItem('hallOfFame', JSON.stringify(Content.Breakout.hallOfFame));

};

const Settings = (state = [], action) => {
    switch(action.type) {
        case RESET_CONTENT:
            resetContent();
            return state;

        default:
            return state;
    }
};

export default Settings;