import React, { Component } from 'react'
import Image from 'next/image';


export default class recipesPost extends Component<{rep_name?: string, rep_des?: string, calories?: Int16Array, likes?: Int16Array, img?: string}> {
    constructor(props: any){
        super(props);
    }
  render() {
    return (
        <div className="w-[600px] shadow-xl mt-2 ">
        <div  className="grid grid-col-2
        bg-[url(https://s359.kapook.com/pagebuilder/26fcc205-e197-4429-9b2e-2082dd3b7383.jpg)] hover:border-yellow-400 border-transparent border-2 rounded-2xl
        h-[400px] w-full ">
          {/* inbox picture Set */}
            <div className="text-xl font-[kanit] text-yellow-400 flex justify-left pt-4 pl-4">
              {this.props.rep_name}
            </div>
        </div>
      </div>
    )
  }
}