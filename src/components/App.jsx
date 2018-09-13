import React, { Component } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';import CssBaseline from '@material-ui/core/CssBaseline';
import Navigation from './Navigation.jsx';
import Breakout from './Breakout.jsx';
import Home from './Home';

class App extends Component {

    render() {
        let side = 'side';

        return(
            <React.Fragment>
                <CssBaseline />
                <Router basename={process.env.PUBLIC_URL}>
                    <div>
                        <Switch>
                            <Route exact path="/" component={Home} />
                        </Switch>
                        <Switch>
                            <Route exact path="/breakout" component={Breakout} />
                        </Switch>
                    </div>
                </Router>
                <div id={side}>
                    <Navigation />
                </div>
            </React.Fragment>
        )
    }
}


export default App;