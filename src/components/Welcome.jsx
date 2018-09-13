import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateWelcomeContent } from '../actions';
import Editor from './Editor.jsx';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { read_cookie } from 'sfcookies';

const buttonStyle = {
    float: 'right'
};

const headerStyle = {
    fontSize : '45px',
    marginBottom : '10px',
    clear: 'both'
};

class Welcome extends Component {

    constructor(props) {
        let cookie = read_cookie('welcomeContent');
        if(Array.isArray(cookie)) {
            cookie = false;
        }

        super(props);
        this.state = {
            title: (cookie ? cookie.title : 'Welcome'),
            content: (cookie ? cookie.content : 'No content yet'),
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

            this.props.updateWelcomeContent({
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
            contentHtml = <Editor
                content={this.state.content}
                onChange={this.handleContentChange}
            />;
            icon = 'save_icon';

        }

        let output = (
            <div>
                <Typography variant="display2" color="inherit">
                    <Button aria-label="Edit" style={buttonStyle} onClick={this.changeInputState.bind()}>
                        <Icon>{icon}</Icon>
                    </Button>
                </Typography>
                <Typography variant="headline">
                    <div style={headerStyle}>{titleHtml}</div>
                    <div>{contentHtml}</div>
                </Typography>
            </div>
        );

        return output;

    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({updateWelcomeContent}, dispatch);
}

export default connect(null, mapDispatchToProps)(Welcome);