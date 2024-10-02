import React, {useEffect, useState, Component} from "react";
import Spoon from "../image/loadingspoon.gif"
import Image from "next/image";

export default class loading extends Component{
    state = {
        showModal : false,
        showModal2 : false,
        errorLogin : "",
        errorRegister : "",
        text : "hi",
        showImg : true,
    }
    constructor(props : any){
    super(props)
  }
    public setText(word : string){
        this.setState({
            text : word 
        })
    }
    public setShowImg(turn : boolean){
        this.setState({
            showImg : turn 
        })
    }
    public setErrorLogin(word : string){
        this.setState({
        errorLogin : word 
        })
    }
    public setErrorRegister(word : string){
        this.setState({
        errorRegister : word
        })
    }
    public setShowModal2(check : boolean){
        this.setState({
        showModal2 : check,
        })
    }
    public setShowModal(check : boolean){
        this.setState({
        showModal : check,
        })
    }
    render() {
            return(
                <>
                    <div>
                    {
                        this.state.showImg ? (
                                <Image src={Spoon} alt="" width={600} height={600} unoptimized/>
                        ) : (
                            <h3>{this.state.text}</h3>
                        )
                    }
                    </div>
                </>
            )
        }
    }
