import React, {Component} from "react";
import ReactDOM from "react-dom";
import {HashRouter, Route, Link,
    Switch, NavLink,} from 'react-router-dom';

class User extends Component {
    state = {
        savedUser: ""
    };

    componentDidMount() {
        const savedName = localStorage.getItem("savedName");

        if(savedName) {
            this.setState({
                savedUser: savedName
            });
        }
    }

    handleChange = (e) => {
        this.setState({
            inputName: e.target.value
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();

        if(!this.state.savedUser) {

            if(!this.state.inputName) {
                swal({
                    title: "Enter your name to log in!",
                    icon: "./../../images/warning.png",
                    buttons: {
                        confirm : {text:'Ok',className:'sweet-warning'}
                    },
                })
                    .then((willDelete) => {
                        if (willDelete) {
                            this.deleteMe(id);
                        } else {
                            return null;
                        }
                    });
            } else {
                localStorage.setItem("savedName", this.state.inputName);

                this.setState({
                    savedUser: this.state.inputName
                });
            }
        }
    };

    handleLogout = (e) => {
        e.preventDefault();

        if(this.state.savedUser) {
            localStorage.removeItem("savedName");
            this.setState({
                savedUser: "",
                inputName: ""
            });
        } else {
            return null;
        }
    };

    render() {
        if(!this.state.savedUser) {
            return (
                <div className={"blackpage"}>
                    <div className={"whitepage"}>
                        <div className={"userpage"}>
                            <input type="text" placeholder="What's your name?" onChange={this.handleChange} />
                            <button type="submit" className="btn_login" onClick={this.handleSubmit}>Log in</button>
                            <Link className={"off"} to="/"></Link>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className={"blackpage"}>
                    <div className={"whitepage"}>
                        <div className={"userpage"}>
                            <h1>Hello {this.state.savedUser}!</h1>
                            <div className="btns_navigation">
                                <NavLink to="/where"><button className="btn_where" >Where to go?</button></NavLink>
                                <NavLink to="/what"><button className="btn_what" >What to do?</button></NavLink>
                            </div>
                            <button type="submit" className="btn_logout" onClick={this.handleLogout}>Log out</button>
                            <Link className={"off"} to="/"></Link>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default User;
