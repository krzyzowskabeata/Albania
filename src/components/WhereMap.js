import React, {Component} from "react";
import ReactDOM from "react-dom";
import {Link} from 'react-router-dom';

import Map from 'pigeon-maps'
import Overlay from 'pigeon-overlay'
import WhereInfo from './WhereInfo'

class WhereMap extends Component {
    state = {
        basicMap: [41.2100, 19.81866],
        places: [],
        myplaces: this.props.myplaces,
        currentId: this.props.currId,
        mapBox: false
    };

    componentDidMount() {

        fetch("http://localhost:3000/places").then(el => el.json())
            .then(places => {
                this.setState({
                    places
                })
            })
            .catch(err => {
                console.log(err);
            });
    }

    componentWillUnmount() {

        clearInterval(this.intervalMap);
    }

    handleClick = (e) => {

        if(this.state.currentId !== "") {
            this.setState({
                currentId: "",
            });
        } else {
            this.setState({
                currentId: e.target.id
            });
        }
    };

    loadMap = () => {
        this.setState({
            currentId: "",
        });

        this.props.onLoad();
    };

    render() {
        const {places} = this.state;

        const mapAll = (
            <>
                <Map key={1} center={this.state.basicMap} zoom={7.5} width={500} height={500}>
                    <div className={"mappage"} />
                        {places.map(el => {
                            return (
                                <Overlay key={el.id} anchor={[parseFloat(el.lat), parseFloat(el.long)]} offset={[25, 35]}>
                                    <img id={el.id} src={el.mapicon} className={"whereimage"} width={50} height={50} alt='' onClick={this.handleClick} />
                                </Overlay>
                            )
                        })}
                </Map>
            </>
        );

        const placeOne = places.filter(e => {
            return e.id === parseFloat(this.state.currentId);
        });

        const mapOne = (
            <>
                {placeOne.map(el => {
                    return (
                            <Map key={1} center={[parseFloat(el.lat)-0.6, parseFloat(el.long)]} zoom={7.5} width={500} height={500}>
                                <div className={"mappage"} style={{
                                    backgroundColor: "#00000096"
                                }}/>
                                <Overlay key={el.id} anchor={[parseFloat(el.lat), parseFloat(el.long)]} offset={[25, 35]}>
                                    <img id={el.id} src="./../../images/albania2.png" className={"whereimage"} width={50} height={50} alt='' onClick={this.handleClick} />
                                    <WhereInfo myplaces={this.props.myplaces} onLoadMap={this.loadMap} placeId={el.id} />
                                </Overlay>
                            </Map>
                    )
                })}
            </>
        );

        if(this.state.currentId === "") {
            return mapAll;
        } else {
            return mapOne;
        }
    }
}

export default WhereMap;
