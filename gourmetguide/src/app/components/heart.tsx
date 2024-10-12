import React, { Component } from "react";

export default class heart extends Component<{rep_id: any, width? : number, height? : number}> {
  state = {
    isClick : false,
  };
  constructor(props : any){
    super(props)
  }

  public setIsClick(turn : boolean){
    this.setState({
        isClick : turn
    })
    this.getLike()
  }

  private async getLike(){
    let res = await fetch("http://localhost:3000/attractions/api_likes/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rep_id : this.props.rep_id,
          isClick : this.state.isClick
        }),
      });
      if(res.ok){
        console.log("Like Success");
      }else {
        console.log("Error during Sending Like")
      }
  }


  render() {
    return (
      <div>
        <button onClick={() => this.setIsClick(!this.state.isClick)}>
          {this.state.isClick? (<svg
            xmlns="http://www.w3.org/2000/svg"
            width={this.props.width}
            height={this.props.height}
            fill="red"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"
            />
          </svg>) : 
          (<svg
            className=""
            xmlns="http://www.w3.org/2000/svg"
            width={this.props.width}
            height={this.props.height}
            fill="currentcolor"
            viewBox="0 0 16 16"
          >
            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
          </svg>)}
        </button>
      </div>
    );
  }
}
