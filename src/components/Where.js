import React, {Component} from "react";
import ReactDOM from "react-dom";
import {Link, NavLink} from 'react-router-dom';

import WhereMap from './WhereMap'
import WhereMyPlaces from "./WhereMyPlaces";

class Where extends Component {
    state = {
    myplaces: [],
    currId: "",
    mapVisible: false
};

    componentDidMount() {
        this.loadMyplaces();
    }

    loadMyplaces = () => {

        fetch("http://localhost:3000/myplaces").then(el => el.json())
            .then(myplaces => {
                this.setState({
                    myplaces,
                    currId: ""
                })
            })
            .catch(err => {
                console.log(err);
            });
    };

    handleMap = () => {
        this.setState({
            mapVisible: !this.state.mapVisible
        });
    };

    render() {
        const mapElement = (
            <div className={"wheremap"}>
                <WhereMap myplaces={this.state.myplaces} currId={this.state.currId} onLoad={this.loadMyplaces} anchor={[41.32466, 19.81866]}/>
            </div>
        );

        return (
            <div className={"blackpage"}>
                <div className={"wherepage"} style={{
                    left: this.state.mapVisible ? "" : "25%",
                    right: this.state.mapVisible ? "" : "25%"
                }}>
                        <div className={"wherego"}>
                            <div className={"show_map"} onClick={this.handleMap}>
                                {this.state.mapVisible ? "Hide map" : "Show map"}
                            </div>
                            {this.state.mapVisible ? mapElement : null}
                            <div className={"mustsee_all"}>
                                <div className={"mustsee"}>Where to go?</div>
                                <WhereMyPlaces myplaces={this.state.myplaces} currId={this.state.currId} onLoad={this.loadMyplaces}  />
                                <NavLink to="/what"><button className="btn_what" >What to do?</button></NavLink>
                            </div>
                        </div>
                    <Link className={"off"} to='/'></Link>
                </div>
            </div>
        );
    }
}

export default Where;
