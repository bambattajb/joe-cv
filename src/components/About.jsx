import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';

const headerStyle = {
    fontSize : '45px',
    marginBottom : '10px',
    clear: 'both',
    marginTop: '55px'
};

class About extends Component {
    render() {
        return(
            <div>
                <Typography variant="headline">
                    <div style={headerStyle}>About this CV</div>
                    <div>
                        <p>
                            This CV is written in <a href="https://reactjs.org/" target="_blank" rel="noopener noreferrer">React</a> + <a href="https://redux.js.org/" target="_blank" rel="noopener noreferrer">Redux</a> with <a href="https://material-ui.com/" target="_blank" rel="noopener noreferrer">Material UI</a> components.
                        </p>
                        <p>
                            The section content in it can be edited by clicking on the edit icon in the top right of a section as a demonstration of how React can be used to edit content.
                        </p>
                        <p>
                            It is also possible to add and sort sections if you navigate to:<br />
                            <b>Manage Sections</b>
                        </p>
                        <p>
                            I have simply used LocalStorage to store any content changes. If you want to restore the content back to default navigate to:<br /> <b>Settings</b> > <b>Reset content to default</b>
                        </p>
                        <p><small><span style={{display:"inline-block", transform: "scaleX(-1)"}}>©</span> 2018 Joe Buckle</small></p>
                    </div>
                </Typography>
            </div>
        )
    }
}

export default About;