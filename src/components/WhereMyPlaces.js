import React, {Component} from "react";
import ReactDOM from "react-dom";
import {Link} from 'react-router-dom';

class WhereMyPlaces extends Component {
    state = {
        myplaces: this.props.myplaces,
        noteId: this.props.currId,
        infoId: this.props.currId,
        picId: this.props.currId,
        currId: this.props.currId,
        noteVal: ""
    };

    deleteMe = (id) => {

        fetch("http://localhost:3000/myplaces/" + id, {
            method: 'DELETE'
        }).then(data => {
            this.setState({
                infoId: "",
                noteId: "",
                picId: "",
                currId: ""
            });
            this.props.onLoad();
        }).catch(err => {
            console.log(err);
        })
    };

    handleRemove = (e) => {
        const id = e.target.id;

        const [currObj] = this.props.myplaces.filter(el => {
            return el.id === parseFloat(id);
        });

        if(currObj.note) {

            swal({
                title: "Are you sure?",
                text: "You will loose your note!",
                icon: "./../../images/warning.png",
                buttons: {
                    confirm : {text:'Ok',className:'sweet-warning'},
                    cancel : 'Cancel'
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
            this.deleteMe(id);
        }
    };

    handleNote = (e) => {
        const id = e.target.id;

        if(this.state.noteId === "") {
            this.setState({
                noteId: id,
                infoId: "",
                picId: "",
                currId: id
            });
        } else {
            this.setState({
                noteId: "",
                infoId: "",
                picId: "",
                currId: ""
            });
            this.props.onLoad();
        }
    };

    handleInfo = (e) => {
        const id = e.target.id;

        if(this.state.infoId === "") {
            this.setState({
                infoId: id,
                noteId: "",
                picId: "",
                currId: id
            });
        } else {
            this.setState({
                infoId: "",
                noteId: "",
                picId: "",
                currId: ""
            });
            this.props.onLoad();
        }
    };

    handleChange = (e) => {
        this.setState({
            noteVal: e.target.value
        });
        this.props.onLoad();
    };

    handleChangeSave = (e) => {

        const id = e.target.id;
        console.log(this.state.noteVal);

        fetch("http://localhost:3000/myplaces/" + id, {
            method: 'PATCH',
            body: JSON.stringify({note: this.state.noteVal}), // data can be `string` or {object}!
            headers:{
                'Content-Type': 'application/json'
            },
            credentials: 'same-origin'
        }).then(el => el.json())
            .then(myplaces => {
                this.props.onLoad();
            })
            .catch(err => {
                console.log(err);
            });
    };

    handlePhoto = (e) => {

        const id = e.target.id;

        if(this.state.picId === "") {
            this.setState({
                infoId: "",
                noteId: "",
                picId: id,
                currId: id
            });
        } else {
            this.setState({
                infoId: "",
                noteId: "",
                picId: "",
                currId: ""
            });

            this.props.onLoad();
        }
    };

    render() {

        if(this.state.currId === "" && (this.state.noteId === "" && this.state.infoId === "" && this.state.picId === "")) {
            if(this.props.myplaces.length > 0) {
                return (
                    <ul className={"myplaces"}>
                        {this.props.myplaces.map(e => {
                            return (
                                <li key={e.id}>
                                    <img id={e.id} className={"camera"} src={"./../../images/camera.png"} onClick={this.handlePhoto} />
                                    <h3>{e.name}</h3>
                                    <div>
                                        <button id={e.id} className={"btn_info"} onClick={this.handleInfo}>Info</button>
                                        <button id={e.id} className={"btn_add_note"} onClick={this.handleNote}>Note</button>
                                        <button id={e.id} className={"btn_rem"} onClick={this.handleRemove}>Remove</button>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                );
            } else {
                return (
                    <div className={"noplaces"}>
                        <p>You have no added places :(</p>
                    </div>
                )
            }
        } else if(this.state.noteId !== "" && this.state.infoId === ""  && this.state.picId === "") {
            const placeNote = this.props.myplaces.filter(el => {
                return el.id === parseFloat(this.state.noteId);
            });

            return (
                <ul className={"myplaces"}>
                    {placeNote.map(e => {
                        return (
                            <li key={e.id}>
                                <img id={e.id} className={"camera"} src={"./../../images/camera.png"} onClick={this.handlePhoto} />
                                <h3>{e.name}</h3>
                                <div className={"myplaces_added"}>
                                    <button id={e.id} className={"btn_info"} onClick={this.handleInfo}>Info</button>
                                    <button id={e.id} className={"btn_add_note"} onClick={this.handleNote}>Note</button>
                                    <button id={e.id} className={"btn_rem"} onClick={this.handleRemove}>Remove</button>
                                </div>
                                <div className={"myplaces_note"}>
                                    <input type="text" defaultValue={e.note} placeholder="Have a note?" onChange={this.handleChange} className={e.note ? "existing_note" : ""}/>
                                    <button id={e.id} className={"btn_edit_note"} onClick={this.handleChangeSave} >Save</button>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            );
        } else if(this.state.noteId === "" && this.state.infoId !== ""  && this.state.picId === "") {
            const placeInfo = this.props.myplaces.filter(el => {
                return el.id === parseFloat(this.state.infoId);
            });

            return (
                <ul className={"myplaces"}>
                    {placeInfo.map(e => {
                        return (
                            <li key={e.id}>
                                <img id={e.id} className={"camera"} src={"./../../images/camera.png"} onClick={this.handlePhoto} />
                                <h3>{e.name}</h3>
                                <div className={"myplaces_added"}>
                                    <button id={e.id} className={"btn_info"} onClick={this.handleInfo}>Info</button>
                                    <button id={e.id} className={"btn_add_note"} onClick={this.handleNote}>Note</button>
                                    <button id={e.id} className={"btn_rem"} onClick={this.handleRemove}>Remove</button>
                                </div>
                                <div className={"myplaces_info"}>
                                    <p>{e.description}</p>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            );

        } else {

            const placePicture = this.props.myplaces.filter(el => {
                return el.id === parseFloat(this.state.picId);
            });

            return (
                <ul className={"myplaces"}>
                    {placePicture.map(e => {
                        return (
                            <li key={e.id}>
                                <img id={e.id} className={"camera"} src={"./../../images/camera.png"} onClick={this.handlePhoto} />
                                <h3>{e.name}</h3>
                                <div className={"myplaces_added"}>
                                    <button id={e.id} className={"btn_info"} onClick={this.handleInfo}>Info</button>
                                    <button id={e.id} className={"btn_add_note"} onClick={this.handleNote}>Note</button>
                                    <button id={e.id} className={"btn_rem"} onClick={this.handleRemove}>Remove</button>
                                </div>
                                <div className={"myplaces_pic"}>
                                    <img src={e.image} />
                                </div>
                            </li>
                        )
                    })}
                </ul>
            );

        }
    }
}

export default WhereMyPlaces;
