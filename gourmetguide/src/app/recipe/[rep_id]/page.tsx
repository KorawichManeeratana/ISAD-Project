"use client"
import React, { Component } from 'react'

export default class page extends Component<{searchParams: any}>{
  state = {
    recipe : []
  };

  constructor(props : any){
    super(props)
  }
  ;
  public setRecipes(data : any){
    this.setState({
      recipe: data
    });
  };

  public componentDidMount(){
      this.getRecipe();
  };

  public async getRecipe(){
    console.log("rep id :", this.props.searchParams.rep_id);
    let res = await fetch("http://localhost:3000/attractions/api_specificSearch/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        rep_id : this.props.searchParams.rep_id
      }),
    });
    let data: any = await res.json();
    console.log("data:", data);
  };

  render() {
    return (
        <div className='bg-gray-200'>
            <div className="overflow-y-auto"></div> {/* scroll bar */}
                <div className="w-[90vw] flex justify-center items-center h-[900px] m-auto border-20 border-x-gray-400 bg-yellow-100 px-8">
                    <div className='grid-rows-3 '>
                        <h1 className='text-3xl font-kanit text-normal text-yellow-700'>{this.state.recipe[0]}</h1>
                        <img className="w-[529px] h-[343px]"src={this.props.searchParams.Img} alt='NAN'/>
                    </div>
                </div>
            </div>
    )
  }
}
