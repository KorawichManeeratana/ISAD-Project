import { Separator } from '@radix-ui/react-dropdown-menu'
import React, { Component } from 'react'


export default class Reportform extends Component <{
    id : number,
    username : string,
    problem : string,
    status : string,
    created_date : string
    }>{
    
    state : any ={
      deleted : false
    }

    public setDelete(check : boolean){
      this.setState({deleted : check})
      this.deleteForm();
    }

    public async deleteForm(){
    try{
        let de = await fetch("http://localhost:3000/attractions/api_deleteForm(report)",{
          method: "POST",
          headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          report_id : this.props.id,
          deleted : this.state.deleted,
        }),
          });    
        if(de.ok){
          window.location.reload();
          console.log(de);
        }
    }catch(error){
      console.log("Error : ", error);
    }
  }
  render() {
    return (
      <div className=''>
            <div className='grid grid-cols-6 bg-white text-black p-1 rounded-lg'>
                <div className="basis-1/4">{this.props.id}</div>
                <div className="basis-1/2">{this.props.username}</div>
                <div className="basis-1/2">{this.props.problem}</div>
                <div className="basis-1/2">{this.props.status}</div>
                <div className="basis-1/2">{this.props.created_date}</div>
                <div className='flex justify-center items-center h-full'>
                  <button type="button" className='bg-red-600 w-40 h-10 rounded-lg' onClick={() => this.setDelete(true)}>Delete</button>
                </div>
            </div>
      </div>
    )
  }
}
