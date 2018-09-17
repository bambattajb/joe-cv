import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HashRouter as Router, Route } from 'react-router-dom';
import { spring, AnimatedSwitch } from 'react-router-transition';
import { addSection, updateSectionOrder } from '../actions';
import CssBaseline from '@material-ui/core/CssBaseline';
import ManageSections from './ManageSections.jsx';
import Section from './Section.jsx';
import Footer from './Footer.jsx';
import Header from './Header.jsx';
import Breakout from './Breakout.jsx';
import Settings from './Settings.jsx';
import Home from './Home';

const getSlug = (i, sectionCount) => {
    let slug = '/section/' + i;
    if(i>-1 && i<sectionCount) {
        return slug;
    }
    return false;
};

const getName = (i, sections) => {
    if(i>-1 && i<sections.length) {
        return sections[i].title;
    }

    return false;
};

function mapStyles(styles) {
    return {
        opacity: styles.opacity,
        transform: `scale(${styles.scale})`,
    };
}

function bounce(val) {
    return spring(val, {
        stiffness: 330,
        damping: 22,
    });
}

const bounceTransition = {
    atEnter: {
        opacity: 0,
        scale: 1.2,
    },
    atLeave: {
        opacity: bounce(0),
        scale: bounce(0.8)
    },
    atActive: {
        opacity: bounce(1),
        scale: bounce(1),
    },
};

class App extends Component {

    getDynamicSectionRoutes() {
        let sections = this.props.sections;
        let navSections = [],
            slug,
            content,
            title;

        for(let i=0; i<sections.length;i++) {
            let ii = i;
            //slug = '/'+sections[ii].title.toLowerCase().replace(' ', '-');
            slug = getSlug(ii, sections.length);
            content = sections[ii].content;
            title = sections[ii].title;
            let nextRouteName = getName(ii+1, sections);
            let prevRouteName = getName(ii-1, sections);

            navSections[i] = <AnimatedSwitch
                key={ii}
                atEnter={bounceTransition.atEnter}
                atLeave={bounceTransition.atLeave}
                atActive={bounceTransition.atActive}
                mapStyles={mapStyles}
                className="route-wrapper"
            ><Route exact path={slug} render={() =>
                <Section
                    prevRoute={getSlug(ii-1, sections.length)}
                    nextRoute={getSlug(ii+1, sections.length)}
                    nextRouteName={nextRouteName}
                    prevRouteName={prevRouteName}
                    index={ii}
                    title={title}
                    content={content} />}
            /></AnimatedSwitch>
        }

        return navSections;
    }

    render() {
        let side = 'side';

        return(
            <React.Fragment>
                <CssBaseline />
                <Router basename={process.env.PUBLIC_URL}>
                    <div>
                        <Header />
                        <AnimatedSwitch
                            atEnter={bounceTransition.atEnter}
                            atLeave={bounceTransition.atLeave}
                            atActive={bounceTransition.atActive}
                            mapStyles={mapStyles}
                            className="route-wrapper"
                        >
                            <Route exact path="/" component={Home} />
                        </AnimatedSwitch>
                        {this.getDynamicSectionRoutes()}
                        <AnimatedSwitch
                            atEnter={bounceTransition.atEnter}
                            atLeave={bounceTransition.atLeave}
                            atActive={bounceTransition.atActive}
                            mapStyles={mapStyles}
                            className="route-wrapper"
                        >
                            <Route exact path="/manage-sections" component={ManageSections} />
                        </AnimatedSwitch>
                        <AnimatedSwitch
                            atEnter={bounceTransition.atEnter}
                            atLeave={bounceTransition.atLeave}
                            atActive={bounceTransition.atActive}
                            mapStyles={mapStyles}
                            className="route-wrapper"
                        >
                            <Route exact path="/settings" component={Settings} />
                        </AnimatedSwitch>
                        <AnimatedSwitch
                            atEnter={bounceTransition.atEnter}
                            atLeave={bounceTransition.atLeave}
                            atActive={bounceTransition.atActive}
                            mapStyles={mapStyles}
                            className="route-wrapper"
                        >
                            <Route exact path="/breakout" component={Breakout} />
                        </AnimatedSwitch>

                        <Footer />
                    </div>
                </Router>
                <div id={side}>
                </div>
            </React.Fragment>
        )
    }
}

function mapStateToProps(state) {
    return {
        sections : state.manageSections
    }
}

export default connect(mapStateToProps, {addSection, updateSectionOrder})(App);