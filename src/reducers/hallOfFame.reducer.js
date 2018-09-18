import { ADDTO_BREAKOUT_HALLOFFAME } from '../constants';
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

const hallOfFame = (state = [], action) => {
    let data = null;
    /*let storage = localStorage.getItem('hallOfFame');

    if(storage==null) {
        localStorage.setItem('hallOfFame', JSON.stringify(Content.Breakout.hallOfFame));
    }

    state = JSON.parse(storage); */
    state = Content.Breakout.hallOfFame;

    switch(action.type) {
        case ADDTO_BREAKOUT_HALLOFFAME:

            data = [...state, topScorer(action)];

            // Sort in order of score
            sortHighScores(data);

            // If the hall of fame > 10 remove bottom
            if(data.length>10) {
                data.pop();
            }

            localStorage.setItem('hallOfFame', JSON.stringify(data));
            return data;

        default:
            return state;
    }
};

export default hallOfFame;