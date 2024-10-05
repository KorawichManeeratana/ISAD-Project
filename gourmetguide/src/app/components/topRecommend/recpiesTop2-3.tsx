import React, { Component } from "react";
import Image from "next/image";

export default class recipesPost extends Component<{
  rep_name?: string;
  Img?: string;
}> {
  constructor(props: any) {
    super(props);
  }
  render() {
    return (
      <div className="w-[541px] shadow-xl mt-2">
        <div className="grid grid-col-2 bg-white hover:border-yellow-400 border-transparent border-2 rounded-2xl ">
          <img
            src={this.props.Img}
            alt="Failed"
            className="h-[250px] w-full"
          ></img>
          <div className="text-xl font-[kanit] text-yellow-400 flex justify-left pt-4 pl-4">
            {this.props.rep_name}
          </div>
        </div>
      </div>
    );
  }
}
