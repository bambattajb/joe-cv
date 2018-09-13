import { UPDATE_WELCOME_CONTENT } from '../constants.js';
import { ADDTO_BREAKOUT_HALLOFFAME } from '../constants.js';

export const updateWelcomeContent = (data) => {
    const action = {
        type: UPDATE_WELCOME_CONTENT,
        title: data.title,
        content: data.content
    };

    return action;
};

export const addToBreakoutHallOfFame = (data) => {
    const action = {
        type: ADDTO_BREAKOUT_HALLOFFAME,
        name: data.name,
        score: data.score
    };
    return action;
};