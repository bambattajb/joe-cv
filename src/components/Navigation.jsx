import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';

const styles = {
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
    navigationBtn : {
        position: 'fixed',
        top: 10,
        left:10,
        transform: 'scale(1.8)'
    }
};

class Navigation extends Component {

    state = {
        left: false
    };

    toggleNavigation = (open) => () => {
        this.setState({
            left: open
        });
    };

    render() {
        const { classes } = this.props;

        const sideList = (
            <div className={classes.list}>
                <List component="nav">
                    <ListItem button component="a" href={process.env.PUBLIC_URL + '/#/'}>
                        <ListItemText primary="Welcome" />
                    </ListItem>
                    <Divider />
                    <ListItem button component="a" href={process.env.PUBLIC_URL + '/#/breakout'}>
                        <ListItemText primary="Play Breakout" />
                    </ListItem>
                </List>
            </div>
        );

        return (
            <div>
                <Button className={classes.navigationBtn} onClick={this.toggleNavigation(true)}><Icon>menu</Icon></Button>
                <Drawer open={this.state.left} onClose={this.toggleNavigation(false)}>
                    <div
                        tabIndex={0}
                        role="button"
                        onClick={this.toggleNavigation(false)}
                        onKeyDown={this.toggleNavigation(false)}
                    >
                        {sideList}
                    </div>
                </Drawer>
            </div>
        )
    }
}

export default withStyles(styles)(Navigation);