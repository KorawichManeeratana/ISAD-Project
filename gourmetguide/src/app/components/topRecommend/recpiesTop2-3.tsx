import React, { Component } from "react";
import Image from "next/image";
import Link from "next/link";

export default class recipesPost extends Component<{
  rep_id?: number;
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
        <Link
            href={{
              pathname: `/recipe/${this.props.rep_id}/`,
            query: {
              rep_id : this.props.rep_id
            }}}
          ><img
            src={this.props.Img}
            alt="Failed"
            className="h-[250px] w-full object-cover object-center"
          ></img></Link>
          <div className="text-xl font-[kanit] text-yellow-400 flex justify-left pt-4 pl-4">
            {this.props.rep_name}
          </div>
        </div>
      </div>
    );
  }
}
