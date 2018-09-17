import {
    // Sections
    ADD_SECTION,
    UPDATE_SECTION,
    UPDATE_SECTION_ORDER,
    // Settings
    RESET_CONTENT,
    // Breakout
    ADDTO_BREAKOUT_HALLOFFAME
} from '../constants.js';

const getSections = () => {
    return  JSON.parse(localStorage.getItem('sections'));
};

export const addSection = (data) => {
    const action = {
        type: ADD_SECTION,
        title : data.title,
        content : '' // Default no content
    };

    return action;
};

export const updateSection = (data) => {
    let sections = getSections();

    sections[data.index] = {
        title : data.title,
        content : data.content
    };

    const action = {
        type: UPDATE_SECTION,
        sections
    };

    return action;
};

export const deleteSection = (index) => {
    let sections = getSections();
    sections.splice(index, 1);

    const action = {
        type: UPDATE_SECTION,
        sections
    };

    return action;
};

export const updateSectionOrder = (data) => {
    const action = {
        type: UPDATE_SECTION_ORDER,
        data: data
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


export const resetContent = () => {
    const action = {
        type: RESET_CONTENT
    };

    return action;
};