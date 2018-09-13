import { ADDTO_BREAKOUT_HALLOFFAME } from '../constants';
import { bake_cookie, read_cookie } from 'sfcookies';
import Content from '../content.json';

const topScorer = (action) => {
    return {
        name: action.name,
        score: action.score,
        id: Math.random()
    }
};

const sortHighScores = (scores) => {
    return scores.sort(function(a,b) {
        return b.score - a.score
    });
};

let cookie = read_cookie('hallOfFame');
if(Array.isArray(cookie)) {
    bake_cookie('hallOfFame', sortHighScores(Content.Breakout.hallOfFame));
}

const hallOfFame = (state = [], action) => {
    let data = null;
    let cookie = read_cookie('hallOfFame');

    if(Array.isArray(cookie)) {
        state = cookie;
    }

    switch(action.type) {
        case ADDTO_BREAKOUT_HALLOFFAME:

            data = [...state, topScorer(action)];

            // Sort in order of score
            sortHighScores(data);

            // If the hall of fame > 10 remove bottom
            if(data.length>10) {
                data.pop();
            }

            bake_cookie('hallOfFame', data);
            return data;

        default:
            return state;
    }
};

export default hallOfFame;