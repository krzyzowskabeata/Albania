import React, {Component} from "react";
import ReactDOM from "react-dom";

class HeaderFooter extends Component {
    render() {
        return (
            <div className="footer">
                <div>
                <h4>Copyrights Reserved &#169;</h4>
                </div>
                <div className="media">
                    <div>
                        <a href="#"><img src="./../../images/twitter.png" /></a>
                    </div>
                    <div>
                        <a href="#"><img src="./../../images/instagram.png" /></a>
                    </div>
                    <div>
                        <a href="#"><img src="./../../images/pinterest.png" /></a>
                    </div>
                    <div>
                        <a href="#"><img src="./../../images/facebook.png" /></a>
                    </div>
                </div>
                <div>
                <h4 className="copyrights" >Albania &#174;</h4>
                </div>
            </div>
        );
    }
}

export default HeaderFooter;
