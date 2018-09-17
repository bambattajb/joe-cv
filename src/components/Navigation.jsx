import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { addSection, updateSectionOrder } from '../actions';
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
    constructor(props) {
        super(props);

        this.state = {
            left: false,
            sections: []
        }
    };

    toggleNavigation = (open) => () => {
        this.setState({
            left: open
        });
    };

    getNavSections() {
        let sections  = this.props.sections;
        let navSections = [],
            slug;

        let i = 0;
        sections.forEach(function(s) {
            //slug = s.title.toLowerCase().replace(' ', '-');
            slug = '/section/' + i;
            navSections[i] = <ListItem key={i} button component="a" href={process.env.PUBLIC_URL + '/#'+slug}><ListItemText primary={s.title} /></ListItem>;
            i++;
        });

        return navSections;
    }

    render() {

        const { classes } = this.props;

        const sideList = (
            <div className={classes.list}>
                <List component="nav">
                    {this.getNavSections()}
                    <Divider />
                    <ListItem button component="a" href={process.env.PUBLIC_URL + '/#/manage-sections'}>
                        <ListItemText primary="Manage Sections" />
                    </ListItem>
                    <ListItem button component="a" href={process.env.PUBLIC_URL + '/#/settings'}>
                        <ListItemText primary="Settings" />
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

function mapStateToProps(state) {
    return {
        sections : state.manageSections
    }
}

export default connect(mapStateToProps, {addSection, updateSectionOrder})(withStyles(styles)(Navigation));