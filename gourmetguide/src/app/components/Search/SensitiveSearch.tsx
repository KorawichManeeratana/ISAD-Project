"use client";
import React, { Component } from "react";
import Search from "./Seacrh";
import Modal from "../modal";
import { useState, useEffect, useRef } from "react";

export const SensitiveSearch = ({
  initialMin,
  initialMax,
  min,
  max,
  step,
  Cap,
  Visible,
}: {
  initialMin: number,
  initialMax: number,
  min: number,
  max: number,
  step: number,
  Cap: number,
  Visible : boolean,
}) => {
  const progressRef: any = useRef(null);
  const [showSearch, setShowSearch]: [showSearch : boolean, setShowSearch : any] = useState(Visible);
  const [minValue, setMinValue]: [minValue: any, setMinValue: any] = useState(initialMin);
  const [maxValue, setMaxValue]: [maxValue: any, setMaxValue: any] = useState(initialMax);

  const handleCloseModal = () => {
    console.log("beforeHandle:", showSearch)
    setShowSearch(false);
    console.log("AfterHandle:", showSearch)
  };

  const handleMax = (e: any) => {
    if (maxValue - minValue >= Cap && maxValue <= max) {
      if (parseInt(e.target.value) < parseInt(minValue)) {
      } else {
        setMaxValue(parseInt(e.target.value));
      }
    } else {
      if (parseInt(e.target.value) < minValue) {
        setMinValue(parseInt(e.target.value));
      }
    }
  }
    const handleMin = (e: any) => {
      if (maxValue - minValue >= Cap && maxValue <= max) {
        if (parseInt(e.target.value) > parseInt(maxValue)) {
        } else {
          setMinValue(parseInt(e.target.value));
        }
      } else {
        if (parseInt(e.target.value) < minValue) {
          setMinValue(parseInt(e.target.value));
        }
      }
    }
    useEffect(() => {
        if (progressRef.current) {
          progressRef.current.style.left = (minValue / max) * step + "%";
          progressRef.current.style.right =
            step - (maxValue / max) * step + "%;";
        }
      }, []);
  return (
    <div>
      <Modal isVisible={showSearch} onClose={() => handleCloseModal()}>
        <div className="w-[600px] h-[500px] bg-white rounded-3xl">
          <div className="flex pt-8 justify-center items-center">
            <Search />
          </div>

          <div className="flex justify-center items-center pt-6">
            <div className=" w-[500px] h-[100px] border border-x-transparent border-b-gray-600 rounded-md">

            </div>
          </div>
          
          <div className="pt-6"><span className="text-sm text-gray-500 px-6">จำนวนแคลอรี่</span></div>
          <div className="flex justify-center items-center space-x-8">
            <span className="p-2 font-semibold"> Min</span>
            <input
              onChange={(e) => setMinValue(e.target.value)}
              type="number"
              value={minValue}
              className="w-24 rounded-md border broder-gray-400"
            ></input>
            <div className="ml-2 font-semibold text-lg"> - </div>
            <span className="p-2 font-semibold"> Max</span>
            <input
              onChange={(e) => setMaxValue(e.target.value)}
              type="number"
              value={maxValue}
              className="w-24 rounded-md border broder-gray-400"
            ></input>
          </div>
          {/*slider */}
          <div className="my-4 px-16">
            <div className="slider relative w-full h-1 rounded-md bg-gray-300">
              <div
                className="progress absolute h-1 bg-green-300 rounded"
                ref={progressRef}
              ></div>
            </div>
            <div className="range-input relative">
              <input
                onChange={handleMin}
                type="range"
                value={minValue}
                min={min}
                step={step}
                max={max}
                className="range-min absolute w-full -top1 h-1 bg-transparent appearance-none pointer-events-none"
              />

              <input
                onChange={handleMax}
                type="range"
                value={maxValue}
                min={min}
                step={step}
                max={max}
                className="range-max absolute w-full -top1 h-1 bg-transparent appearance-none pointer-events-none"
              />
            </div>
          </div>
          <div className="pt-6"><span className="text-sm text-gray-500 px-6">เวลาในการทำ</span></div>
          {/* ส่วนของ input เวลาในการทำ */}
          <div className="flex justify-center items-center space-x-8">
            <span className="p-2 font-semibold"> Min</span>
            <input
              type="number"
              placeholder="เวลาเร็วที่สุด"
              className="w-24 rounded-md border broder-gray-400"
            ></input>
            <div className="ml-2 font-semibold text-lg"> - </div>
            <span className="p-2 font-semibold"> Max</span>
            <input
              type="number"
              placeholder="เวลานานสุด"
              className="w-24 rounded-md border broder-gray-400"
            ></input>
          </div>
          <div className="flex justify-end px-8 py-6"><button className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-6 ml-10 rounded-l-3xl rounded-r-3xl">ค้นหา</button></div>
          
        </div>
      </Modal>
    </div>
  );
};
