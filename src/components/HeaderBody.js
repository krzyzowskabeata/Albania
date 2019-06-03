import React, {Component} from "react";
import ReactDOM from "react-dom";
import {HashRouter, Route, Link, Switch, NavLink} from 'react-router-dom';
import NavigationBody from "./NavigationBody";
import Home from "./Home"
import User from "./User"
import Where from "./Where"
import What from "./What"
import NotFound from "./NotFound"

class HeaderBody extends Component {
    render() {
        return (
            <HashRouter>
                <>
                    <NavigationBody />
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route path ='/user' component={User} />
                        <Route path='/where' component={Where} />
                        <Route path='/what' component={What} />
                        <Route component={NotFound} />
                    </Switch>
                </>
            </HashRouter>
        );
    }
}

export default HeaderBody;
