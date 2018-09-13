import {UPDATE_WELCOME_CONTENT} from "../constants";
import Content from '../content.json';
import {bake_cookie, read_cookie} from "sfcookies";

let cookie = read_cookie('welcomeContent');
if(Array.isArray(cookie)) {
    bake_cookie('welcomeContent', Content.Welcome);
}

const welcomeContent = (state = [], action) => {
    let data = null;

    let cookie = read_cookie('welcomeContent');
    if(Array.isArray(cookie)) {
        state = cookie;
    }

    switch(action.type) {

        case UPDATE_WELCOME_CONTENT:
            data = {
                title: action.title,
                content : action.content
            };

            bake_cookie('welcomeContent', data);
            return data;

        default:
            return state;
    }
};

export default welcomeContent;