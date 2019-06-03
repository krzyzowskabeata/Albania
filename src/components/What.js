import React, {Component} from "react";
import ReactDOM from "react-dom";
import {HashRouter, Route, Link, Switch, NavLink} from 'react-router-dom';
import WhatInfo from "./WhatInfo";

class What extends Component {
    state = {
        activities: [],
        myactivities: [],
        myplaces: []
    };

    componentDidMount() {

        fetch("http://localhost:3000/activities").then(el => el.json())
            .then(activities => {
                this.setState({
                    activities
                })
            })
            .catch(err => {
                console.log(err);
            });

        this.loadMyactivities();
    }

    loadMyactivities = () => {

        fetch("http://localhost:3000/myactivities").then(el => el.json())
            .then(myactivities => {
                this.setState({
                    myactivities
                })
            })
            .catch(err => {
                console.log(err);
            });

        fetch("http://localhost:3000/myplaces").then(el => el.json())
            .then(myplaces => {
                this.setState({
                    myplaces
                })
            })
            .catch(err => {
                console.log(err);
            });
    };

    render() {
        return (
            <div className={"blackpage"}>
                <div className={"whatpage"}>
                    <WhatInfo myactivities={this.state.myactivities} activities={this.state.activities} myplaces={this.state.myplaces}  onLoad={this.loadMyactivities} />
                    <NavLink to="/where"><button className="btn_where" >Where to go?</button></NavLink>
                    <Link className={"off"} to='/'></Link>
                </div>
            </div>
        );
    }
}

export default What;
