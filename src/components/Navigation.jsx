import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { addSection, updateSectionOrder } from '../actions';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Divider from '@material-ui/core/Divider';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';

const styles = {
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
    navigationBtn : {
        transform: 'scale(1.8)'
    }
};

class Navigation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            left: false,
            sections: [],
            selectedIndex:0
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
            slug,
            that = this;

        for(let i=0; i<sections.length; i++) {
            //slug = s.title.toLowerCase().replace(' ', '-');
            slug = '/section/' + i;
            navSections[i] = <ListItem
                key={i}
                button
                component="a"
                href={process.env.PUBLIC_URL + '/#'+slug}
                selected={that.state.selectedIndex === i}
                onClick={event => that.handleListItemClick(event, i)}
            >
                <ListItemText primary={sections[i].title} /></ListItem>;
        }

        return navSections;
    }

    handleListItemClick(event, index) {
        this.setState({ selectedIndex: index });
    }

    render() {

        const { classes } = this.props;

        const sideList = (
            <div className={classes.list}>
                <List component="nav">
                    <ListSubheader>My CV</ListSubheader>
                    <Divider />
                    {this.getNavSections()}
                    <br />
                    <ListSubheader>Other</ListSubheader>
                    <Divider />
                    <ListItem button component="a" href={process.env.PUBLIC_URL + '/#/about'} selected={this.state.selectedIndex === 100}
                              onClick={event => this.handleListItemClick(event, 100)}>
                        <ListItemText primary="About this CV" />
                    </ListItem>
                    <ListItem button component="a" href={process.env.PUBLIC_URL + '/#/manage-sections'} selected={this.state.selectedIndex === 101}
                              onClick={event => this.handleListItemClick(event, 101)}>
                        <ListItemText primary="Manage Sections" />
                    </ListItem>
                    <ListItem button component="a" href={process.env.PUBLIC_URL + '/#/settings'} selected={this.state.selectedIndex === 102}
                              onClick={event => this.handleListItemClick(event, 102)}>
                        <ListItemText primary="Settings" />
                    </ListItem>
                    <ListItem button component="a" href="https://github.com/bambattajb/joe-cv/tree/master" target="_blank">
                        <ListItemText primary="Code" />
                    </ListItem>
                    <Hidden smDown>
                        <br />
                        <ListSubheader>Games</ListSubheader>
                        <Divider />
                        <ListItem button component="a" href={process.env.PUBLIC_URL + '/#/breakout'} selected={this.state.selectedIndex === 103}
                                  onClick={event => this.handleListItemClick(event, 103)}>
                            <ListItemText primary="Play Breakout" />
                        </ListItem>
                    </Hidden>
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