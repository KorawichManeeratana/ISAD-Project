"use client"
import React from 'react'
import Loading from "./components/loading"
import Modal from './components/modal'

export default function loading() {
  return (
    <>
    <div className="flex justify-center items-center height-[90vw]">
    <Modal isVisible={true} onClose={(false)}><><Loading/></></Modal>
    </div>
    </>
  )
}
