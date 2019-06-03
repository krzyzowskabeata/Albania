import React, {Component} from "react";
import ReactDOM from "react-dom";

class WhereInfo extends Component {
    state = {
        places: [],
        myplaces: this.props.myplaces,
        placeId: this.props.placeId
    };

    componentDidMount() {

        fetch("http://localhost:3000/places").then(el => el.json())
            .then(places => {
                this.setState({
                    places: places
                })
            })
            .catch(err => {
                console.log(err);
            });

        this.setState({
            currId: this.props.currId
        })
    }

    handleAdd = () => {

        const {places, placeId} = this.state;

        const obj = places.filter(e => {
            return e.id === parseFloat(placeId);
        });

        const existingObj = this.props.myplaces.filter(e => {
            return e.id === parseFloat(placeId);
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
                        placeId: "",
                        currId: ""
                    });

                    this.props.onLoadMap();
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
                title: obj[0].name + " already added!",
                icon: "./../../images/warning.png",
                buttons: {
                    confirm : {text:'Ok',className:'sweet-warning'},
                },
            })
                .then(() => {
                    this.props.onLoadMap();
                });
        }
    };

    render() {
        const {places} = this.state;

        const currPlace = places.filter(e => {
            return e.id === parseFloat(this.props.placeId);
        });

        if(currPlace.length > 0) {
            return (
                <>
                    {currPlace.map(e => {
                        return (
                            <div key={e.id} className={"whereinfo_box"}>
                                <img className={"whereinfo_image"} src={e.image} />
                                <div className={"whereinfo"}>
                                    <h4>{e.name}</h4>
                                    <p>{e.description}</p>
                                    <button id={e.id} className={"btn_add"} onClick={this.handleAdd}>Add</button>
                                </div>
                            </div>
                        )
                    })}
                </>
            )
        } else {
            return null;
        }
    }
}

export default WhereInfo;
