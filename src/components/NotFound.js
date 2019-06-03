import React, {Component} from "react";
import ReactDOM from "react-dom";
import {HashRouter, Route,
    Link, Switch, NavLink,} from 'react-router-dom';

class NotFound extends Component {
    render() {
        return (
            <div className={"notfound blackpage"}>
                <div className={"whitepage"}>
                    <h1>Site not found!</h1>
                    <Link className={"off"} to="/"></Link>
                </div>
            </div>
        );
    }
}

export default NotFound;
