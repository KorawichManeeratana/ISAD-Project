"use client"
import React, { Component } from 'react'
import SearchResultCard from '../components/SearchResultCard'
import Test from "../image/test01.jpg";

export default class page extends Component {
  render() {
    return (
      <div><SearchResultCard rep_name = "ไอ้ซ๊" name='เบส' Img="https://th.bing.com/th/id/OIP.lYEUJ-IH2yGTTfBPKACSGQHaF0?rs=1&pid=ImgDetMain"/></div>
    )
  }
}
