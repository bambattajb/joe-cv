import {ADD_SECTION, UPDATE_SECTION, UPDATE_SECTION_ORDER} from "../constants";
import Content from '../content.json';

const addSection = (action) => {
    return {
        title : action.title,
        content : action.content,
        id: Math.random()
    }
};

const manageSections = (state = [], action) => {
    let data = null;

    /*let storage = localStorage.getItem('sections');
    if(storage==null) {
         localStorage.setItem('sections', JSON.stringify(Content.Sections));
    }

    state = JSON.parse(storage); */
    state = Content.Sections;

    switch(action.type) {
        case ADD_SECTION:
            data = [...state, addSection(action)];

            localStorage.setItem('sections', JSON.stringify(data));
            return data;

        case UPDATE_SECTION_ORDER:
            action.data = action.data.filter(function(){return true;});

            localStorage.setItem('sections', JSON.stringify(action.data));
            return action.data;

        case UPDATE_SECTION:
            localStorage.setItem('sections', JSON.stringify(action.sections));
            return action.sections;

        default:
            return state;
    }
};

export default manageSections;