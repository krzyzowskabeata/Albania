import React, {Component} from "react";
import ReactDOM from "react-dom";
import {HashRouter, Route, Link, Switch, NavLink, Redirect} from 'react-router-dom';

class What extends Component {
    state = {
        myActivityId: "",
        redirect: ""
    };

    handleChoice = (e) => {

        if(this.state.myActivityId.length > 0) {
            this.setState({
                myActivityId: ""
            });
        } else {
            this.setState({
                myActivityId: e.currentTarget.id
            });
        }
    };

    handleInfo = (e) => {

        const id = e.currentTarget.id;

        const obj = this.props.activities.filter(e => {
            return e.id === parseFloat(id);
        });

        const existingObj = this.props.myplaces.filter(e => {
            return e.id === parseFloat(id);
        });


        if(existingObj.length === 0 && this.props.myplaces.length < 5) {

            fetch("http://localhost:3000/myplaces", {
                method: 'POST', // or 'PUT'
                body: JSON.stringify(obj[0]), // data can be `string` or {object}!
                headers:{
                    'Content-Type': 'application/json'
                },
                credentials: 'same-origin'
            }).then(el => el.json())
                .then(myplaces => {
                    this.setState({
                        redirect: "/where/"
                    })
                })
                .catch(err => {
                    console.log(err);
                });

        } else if (existingObj.length === 0 && this.props.myplaces.length > 4) {

            swal({
                title: "Your trip is long enough!",
                icon: "./../../images/warning.png",
                buttons: {
                    confirm : {text:'Ok',className:'sweet-warning'},
                },
            })
                .then(() => {
                    this.props.onLoadMap();
                });

        } else {

            swal({
                title: obj[0].activity + " in " + obj[0].name + " already added!",
                icon: "./../../images/warning.png",
                buttons: {
                    confirm : {text:'Ok',className:'sweet-warning'},
                },
            })
                .then((willDelete) => {
                    if (willDelete) {
                        this.deleteMe(id);
                    } else {
                        return null;
                    }
                });

            // this.setState({
            //     redirect: "/where/"
            // });
        }
    };

    render() {

        if(this.state.redirect !== "") {
            return <Redirect to={this.state.redirect} />
        }

        if(this.state.myActivityId.length > 0) {

            const myActivity = this.props.activities.filter(el => {
                return el.id === parseFloat(this.state.myActivityId)
            });

            return (
                <div className={"whatdo"}>
                    <div className={"whatdo_info"}>What to do?</div>
                    <ul className={"activity activ_one"}>
                        {myActivity.map(el => {
                            return (
                                <li key={el.id} id={el.id} onClick={this.handleChoice}>
                                    <img src={el.icon} title={el.activity} />
                                    <h3>{el.activity} in {el.name}</h3>
                                    <div>
                                        <button id={el.id} className={"btn_info"} onClick={this.handleInfo}>Must try!</button>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            );

        } else {

            return (
                <div className={"whatdo whatdo_border"}>
                    <div className={"whatdo_info"}>What to do?</div>
                    <ul className={"activity"}>
                        {this.props.activities.map(el => {
                            return (
                                <li key={el.id} id={el.id} onClick={this.handleChoice}>
                                    <img src={el.icon} title={el.activity} />
                                </li>
                            )
                        })}
                    </ul>
                </div>
            );
        }
    }
}

export default What;
