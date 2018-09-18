import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";

const styles = theme => ({
    root: {
        flexGrow: 1,
        position:"fixed",
        bottom:0,
        left:0,
        width:"100%",
        background:"white",
        borderTop:"1px solid grey"
    },
    buttonMargin : {
        margin:"5px"
    }
});

class Footer extends Component {
    state = {
        spacing: '16',
    };

    render() {
        const { classes } = this.props;
        return (
            <Grid container className={classes.root} spacing={16}>
                <Grid item xs={12}>
                    <Grid container justify="center" >
                        <Grid>
                            <Button
                                component={Link}
                                to='/'
                                variant="contained"
                                color="default"
                                type='button'
                                size="small"
                                className={classes.buttonMargin}
                            >
                                Home
                            </Button>
                        </Grid>
                        <Grid>
                            <Button
                                component={Link}
                                to='/manage-sections'
                                variant="contained"
                                color="default"
                                type='button'
                                size="small"
                                className={classes.buttonMargin}
                            >
                                Manage sections
                            </Button>
                        </Grid>
                        <Grid>
                            <Button
                                component={Link}
                                to='/settings'
                                variant="contained"
                                color="default"
                                type='button'
                                size="small"
                                className={classes.buttonMargin}
                            >
                                Settings
                            </Button>
                        </Grid>
                        <Hidden smDown>
                            <Grid>
                                <Button
                                    component={Link}
                                    to='/breakout'
                                    variant="contained"
                                    color="secondary"
                                    type='button'
                                    size="small"
                                    className={classes.buttonMargin}

                                >
                                    Play Breakout!
                                </Button>
                            </Grid>
                        </Hidden>
                    </Grid>
                </Grid>
            </Grid>
    );
    }

}

export default withStyles(styles)(Footer);