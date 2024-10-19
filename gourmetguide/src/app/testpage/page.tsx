"use client"
import React, { Component } from 'react'
import Bookmark from '../components/Bookmark'
import Modal from '../components/modal'

export default class page extends Component {
  render() {
    return (
      <div><Modal isVisible={true} onClose={false}><div></div></Modal></div>
    )
  }
}
