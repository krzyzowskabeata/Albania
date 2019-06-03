import React, {Component} from "react";
import ReactDOM from "react-dom";
import {HashRouter, Route, Link, Switch, NavLink,} from 'react-router-dom';

class NavigationBody extends Component {

    state = {
        userEl: false,
        whereEl: false,
        whatEl: false,
    };

    componentDidMount() {
    }

    componentWillUnmount() {
        clearTimeout(this.timerHide);
    }

    handleNavEnter = (e) => {
        const id = e.currentTarget.id;
        this.setState({
            [id]: true
        });
    };

    handleNavLeave = (e) => {
        const id = e.currentTarget.id;

            this.setState({
                [id]: false
            })

        // this.timerHide = setTimeout(() => {
        //     this.setState({
        //         [id]: false
        //     })
        // }, 1000)
    }

    render() {
        return (
            <>
            <nav className={"nav_main"}>
                <ul>
                    <li id="homeEl">
                        <NavLink className={"navlink"} exact to="/">
                            <img src="./../../images/logo_albania.png" alt="albania" />
                        </NavLink>
                    </li>
                </ul>
            </nav>
            <nav className={"nav_body"}>
                <ul>
                    <li id="userEl" className={this.state.userEl ? "li_active" : ""} onMouseEnter={this.handleNavEnter} onMouseLeave={this.handleNavLeave}>
                        <NavLink className={"navlink"} to="/user">
                            {this.state.userEl ? "Your trip!" : ""}
                            <img src="./../../images/user.png" alt="user" />
                        </NavLink>
                    </li>
                    <li id="whereEl" className={this.state.whereEl ? "li_active" : ""} onMouseEnter={this.handleNavEnter} onMouseLeave={this.handleNavLeave}>
                        <NavLink className={"navlink"} to="/where">
                            {this.state.whereEl ? "Where to go?" : ""}
                            <img src="./../../images/where.png" alt="where" />
                        </NavLink>
                    </li>
                    <li id="whatEl" className={this.state.whatEl ? "li_active" : ""} onMouseEnter={this.handleNavEnter} onMouseLeave={this.handleNavLeave}>
                        <NavLink className={"navlink"} to="/what">
                            {this.state.whatEl ? "What to do?" : ""}
                            <img src="./../../images/what.png" alt="what" />
                        </NavLink>
                    </li>
                </ul>
            </nav>
            </>
        );
    }
}

export default NavigationBody;