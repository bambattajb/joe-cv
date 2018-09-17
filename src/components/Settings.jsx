import React, { Component } from 'react';
import { resetContent } from '../actions';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import connect from "react-redux/es/connect/connect";

const headerStyle = {
    fontSize : '45px',
    marginBottom : '10px',
    clear: 'both'
};

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const styles = theme => ({
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
    },
});

class Settings extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modal: false
        };
    };

    handleModalClose = () => {
        this.setState({
            modal: false
        });
    };

    handleModalOpen = () => {
        this.setState({
            modal: true
        });
    };

    handleModalAccept = () => {

        this.setState({
            modal:false
        });

        this.props.resetContent();
        window.location.replace('/');
    };

    render() {
        const { classes } = this.props;

        return (
            <div>
                <Typography variant="headline">
                    <div style={headerStyle}>Settings</div>
                    <div>
                        <p>
                            <Button variant="contained" color="primary" onClick={this.handleModalOpen}>
                                Reset content to default
                            </Button>
                        </p>
                    </div>
                </Typography>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.modal}
                    onClose={this.handleModalClose}
                >
                    <div style={getModalStyle()} className={classes.paper}>
                        <Typography variant="title" id="modal-title">
                            Restore content to default
                        </Typography>
                        <br />
                        <Typography>
                            By clicking ACCEPT this will remove all your changes and return you to the home page.
                        </Typography>
                        <br />
                        <Button variant="contained" color="primary" onClick={this.handleModalAccept}>Accept</Button>&nbsp;
                        <Button variant="contained" color="secondary" onClick={this.handleModalClose}>Close</Button>

                    </div>
                </Modal>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        settings: state.Settings
    }
}

export default connect(mapStateToProps, {resetContent})(withStyles(styles)(Settings));