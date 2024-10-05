"use client"
import React, {useEffect, useState, Component} from "react";
import Spoon from "../image/loadingspoon.gif"
import Image from "next/image";

export default class loading extends Component{
    state = {
        text : "hi",
        showImg : true,
    }
    constructor(props : any){
    super(props)
  }
    
    render() {
            return(
                <>
                    <div>
                    {
                        this.state.showImg ? (
                                <Image src={Spoon} alt="" width={200} height={200} unoptimized/>
                        ) : (
                            <h3>{this.state.text}</h3>
                        )
                    }
                    </div>
                </>
            )
        }
    }
