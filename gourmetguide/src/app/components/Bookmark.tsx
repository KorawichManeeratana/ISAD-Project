import React, { Component } from "react";
import { jwtDecode } from "jwt-decode";

export default class Bookmark extends Component<{
  width?: number;
  height?: number;
  rep_id?: number;
  ac_id? : number;
}> {
  state : any = {
    isClick: false,
  };
  constructor(props : any){
    super(props)
  }

  public setIsClick(turn : boolean){
    this.setState({
        isClick : turn
    })
    this.getFavourite()
  }
  public setCookieValue(value : any){
    this.setState({
      cookieValue : value
    })
  }
  
  private async getFavourite(){
    console.log('cookiesInbookmark:', this.state.cookieValue?.id)
    let res = await fetch("http://localhost:3000/attractions/api_aorfavourite/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rep_id : this.props.rep_id,
          isClick : this.state.isClick,
          ac_id : this.props.ac_id,
        }),
      });
      if(res.ok){
        console.log("Favourite ADD or unFavourtie Success!");
      }else {
        console.log("Error adding favourite")
      }
  }

  render() {
    return (
      <div>
        <button onClick={() => this.setIsClick(!this.state.isClick)} className="pl-6 pb-8">
          {this.state.isClick ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={this.props.width}
              height={this.props.height}
              fill="yellow"
              stroke="black"
              viewBox="0 0 16 16"
            >
              <path d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={this.props.width}
              height={this.props.height}
              fill="black"
              viewBox="0 0 16 16"
            >
              <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z" />
            </svg>
          )}
        </button>
      </div>
    );
  }
}
