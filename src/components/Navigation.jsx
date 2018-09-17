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
                    {this.getNavSections()}
                    <Divider />
                    <ListItem button component="a" href={process.env.PUBLIC_URL + '/#/manage-sections'} selected={this.state.selectedIndex === 100}
                              onClick={event => this.handleListItemClick(event, 100)}>
                        <ListItemText primary="Manage Sections" />
                    </ListItem>
                    <ListItem button component="a" href={process.env.PUBLIC_URL + '/#/settings'} selected={this.state.selectedIndex === 101}
                              onClick={event => this.handleListItemClick(event, 101)}>
                        <ListItemText primary="Settings" />
                    </ListItem>
                    <Divider />
                    <ListItem button component="a" href={process.env.PUBLIC_URL + '/#/breakout'} selected={this.state.selectedIndex === 102}
                              onClick={event => this.handleListItemClick(event, 102)}>
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