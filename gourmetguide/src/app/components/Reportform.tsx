import { Separator } from '@radix-ui/react-dropdown-menu'
import React, { Component } from 'react'


export default class Reportform extends Component <{
    id : number,
    username : string,
    problem : string,
    status : string,
    created_date : string
    }>{
  render() {
    return (
      <div className=''>
            <div className='grid grid-cols-5 bg-slate-700 text-white p-1'>
                <div className="basis-1/4">{this.props.id}</div>
                <div className="basis-1/2">{this.props.username}</div>
                <div className="basis-1/2">{this.props.problem}</div>
                <div className="basis-1/2">{this.props.status}</div>
                <div className="basis-1/2">{this.props.created_date}</div>
            </div>
      </div>
    )
  }
}
