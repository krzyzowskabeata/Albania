import React, {Component} from "react";
import ReactDOM from "react-dom";

import HeaderBody from "./HeaderBody";
import HeaderFooter from "./HeaderFooter";

class Header extends Component {
    render() {
        return (
            <div className="container">
                <div className="header">
                    <HeaderBody />
                    <HeaderFooter />
                </div>
            </div>
        );
    }
}

export default Header;
