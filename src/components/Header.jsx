import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Navigation from "./Navigation";

const styles = theme => ({
    root: {
        flexGrow: 1,
        position:"fixed",
        top:0,
        left:0,
        width:"100%",
        background:"white",
        borderBottom:"1px solid grey",
        zIndex:1
    }
});

class Header extends Component {
    render() {
        const { classes } = this.props;

        return(
            <header className={classes.root} spacing={16}>
                <Navigation />
            </header>
        )
    }
}

export default withStyles(styles)(Header);