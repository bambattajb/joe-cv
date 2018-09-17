import React, { Component } from 'react';
import connect from "react-redux/es/connect/connect";
import Editor from './Editor.jsx';
import { Route } from 'react-router-dom'
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import {updateSection} from "../actions";

const buttonStyleRight = {
    float: 'right'
};

const buttonStyleLeft = {
    float: 'left'
};

const headerStyle = {
    fontSize : '45px',
    marginBottom : '10px',
    clear: 'both'
};

class Section extends Component {
    constructor(props) {
        super(props);

        this.state = {
            index : props.index,
            title: props.sections[props.index].title,
            content: props.sections[props.index].content,
            nextRoute: props.nextRoute,
            prevRoute: props.prevRoute,
            editing : false,
            type: 'static'
        };

        this.changeInputState = this.changeInputState.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleContentChange = this.handleContentChange.bind(this);
    }

    changeInputState() {

        if(this.state.type==='static') {
            this.setState({type : 'edit'})
        }

        if(this.state.type==='edit') {
            this.setState({type: 'static'});

            this.props.updateSection({
                index : this.state.index,
                title : this.state.title,
                content : this.state.content
            });

        }

        return false;
    }

    handleInputChange = event => {
        let title = event.target.value;
        this.setState({
            title
        });
    };

    handleContentChange(content) {
        this.setState({
            content
        });
    }

    displayNextButton() {
        if(this.state.nextRoute) {
            return {display: "block"}
        }

        return {display: "none"};
    }

    displayPrevButton() {
        if(this.state.prevRoute) {
            return {display: "block"}
        }

        return {display: "none"};
    }

    render() {
        let titleHtml,
            contentHtml,
            icon;

        if(this.state.type==='static') {
            titleHtml = <div>{this.state.title}</div>;
            contentHtml = <div dangerouslySetInnerHTML={{__html: this.state.content}} />;
            icon = 'edit_icon';
        }

        if(this.state.type==='edit') {
            titleHtml = <TextField
                label="Welcome title"
                InputLabelProps={{
                    shrink: true,
                }}
                placeholder="Type your welcome header"
                fullWidth
                margin="normal"
                value={this.state.title}
                onChange={this.handleInputChange}
                style={headerStyle}
            />;
            contentHtml = <div>
                <Editor
                    content={this.state.content}
                    onChange={this.handleContentChange}
                />
                <hr />
                <Typography>
                    <p><b>Note on editing:</b></p>
                    <p>Editing this content will save it to localStorage. To reset it back to navigate to the settings page below.</p>
                </Typography>
            </div>;
            icon = 'save_icon';

        }

        let output = (
            <div>
                <Typography variant="display2" color="inherit">
                    <Button aria-label="Edit" style={buttonStyleRight} onClick={this.changeInputState.bind()}>
                        <Icon>{icon}</Icon>
                    </Button>
                </Typography>
                <Typography variant="headline">
                    <div style={headerStyle}>{titleHtml}</div>
                    <div>{contentHtml}</div>
                </Typography>
                <Route render={({history}) => (
                    <Button
                        style={Object.assign(this.displayPrevButton(), buttonStyleLeft)}
                        variant="contained"
                        color="primary"
                        type='button'
                        onClick={() => { history.push(this.state.prevRoute) }}
                    >
                        Previous section
                    </Button>
                )} />
                <Route render={({history}) => (
                    <Button
                        style={Object.assign(this.displayNextButton(), buttonStyleRight)}
                        variant="contained"
                        color="primary"
                        type='button'
                        onClick={() => { history.push(this.state.nextRoute) }}
                    >
                        Next section
                    </Button>
                )} />
                <p>&nbsp;</p>
                </div>
        );

        return output;
    }
}

function mapStateToProps(state) {
    return {
        sections: state.manageSections
    }
}

export default connect(mapStateToProps, {updateSection})(Section);