"use client";
import React, { Component } from "react";
import Search from "./Seacrh";
import Modal from "../modal";

interface SensitiveSearchProps {
  initialMin: number;
  initialMax: number;
  min: number;
  max: number;
  step: number;
  Cap: number;
  Visible: () => void;
}

export class SensitiveSearch extends Component<SensitiveSearchProps, {showSearch : boolean, minValue : number, maxValue : number}> {
  progressRef: React.RefObject<HTMLDivElement>;

  constructor(props: SensitiveSearchProps) {
    super(props);
    this.progressRef = React.createRef();
    this.state = {
      showSearch: true,
      minValue: this.props.initialMin,
      maxValue: this.props.initialMax,
    };
  }
  public setShowSearch(turn : boolean){
    this.setState({
      showSearch : turn
    })
  }

  public setMinValue(value : number){
    this.setState({
      minValue : value
    })
  }

  public setMaxValue(value : number){
    this.setState({
      maxValue : value
    })
  }

  handleCloseModal = () => {
    this.setShowSearch( false );
    this.props.Visible();
  };

  handleMax = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("handleMax", e.target.value)
    const { minValue } = this.state;
    const { max, Cap } = this.props;
    let newMaxValue = parseInt(e.target.value, 10);

    // Enforce max limit
    newMaxValue = Math.min(newMaxValue, max);

    // Enforce Cap limit
    newMaxValue = Math.min(newMaxValue, minValue + Cap); 

    // Ensure newMax is >= minValue
    this.setMaxValue( Math.max(newMaxValue, minValue));
  };

  handleMin = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { maxValue } = this.state;
    const { min, Cap } = this.props;
    let newMinValue = parseInt(e.target.value, 10);

    // Enforce min limit
    newMinValue = Math.max(newMinValue, min);


    // Enforce Cap limit
    newMinValue = Math.max(newMinValue, maxValue - Cap);

    // Ensure newMin is <= maxValue
    this.setMinValue( Math.min(newMinValue, maxValue));

  };
  


  render() {
    const { min, max, step } = this.props;
    const { minValue, maxValue } = this.state;

    return (
      <div>
        <Modal isVisible={true} onClose={this.handleCloseModal}>
          <div className="w-[600px] h-[500px] bg-white rounded-3xl">
            <div className="flex pt-8 justify-center items-center">
              <input
                type="text"
                placeholder="ค้นหาสูตรอาหาร"
                className="search text-black w-96 px-4 py-2 rounded-l-3xl rounded-r-3xl border border-gray-400px focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>

            <div className="flex justify-center items-center pt-6">
              <div className=" w-[500px] h-[100px] border border-x-transparent border-b-gray-600 rounded-md"></div>
            </div>

            <div className="pt-6">
              <span className="text-sm text-gray-500 px-6">จำนวนแคลอรี่</span>
            </div>
            <div className="flex justify-center items-center space-x-8">
              <span className="p-2 font-semibold"> Min</span>
              <input
                onChange={this.handleMin} // Use handleMin here
                type="number"
                value={minValue}
                className="w-24 rounded-md border broder-gray-400"
              />
              <div className="ml-2 font-semibold text-lg"> - </div>
              <span className="p-2 font-semibold"> Max</span>
              <input
                onChange={this.handleMax} // Use handleMax here
                type="number"
                value={maxValue}
                className="w-24 rounded-md border broder-gray-400"
              />
            </div>

            {/*slider */}
            <div className="my-4 px-16">
              <div className="slider relative w-full h-1 rounded-md bg-gray-300">
                <div
                  className="progress absolute h-1 bg-green-300 rounded"
                  ref={this.progressRef}
                ></div>
              </div>
              <div className="range-input relative">
                <input
                  onChange={this.handleMin}
                  type="range"
                  value={minValue}
                  min={min}
                  step={step}
                  max={max}
                  className="range-min absolute w-full -top1 h-1 bg-transparent appearance-none pointer-events-none"
                />

                <input
                   onChange={this.handleMax}
                  type="range"
                  value={maxValue}
                  min={min}
                  step={step}
                  max={max}
                  className="range-max absolute w-full -top1 h-1 bg-transparent appearance-none pointer-events-none"
                />
              </div>
            </div>
             <div className="pt-6">
              <span className="text-sm text-gray-500 px-6">เวลาในการทำ</span>
            </div>
            {/* ส่วนของ input เวลาในการทำ */}
            <div className="flex justify-center items-center space-x-8">
              <span className="p-2 font-semibold"> Min</span>
              <input
                type="number"
                placeholder="เวลาเร็วที่สุด"
                className="w-24 rounded-md border broder-gray-400"
              />
              <div className="ml-2 font-semibold text-lg"> - </div>
              <span className="p-2 font-semibold"> Max</span>
              <input
                type="number"
                placeholder="เวลานานสุด"
                className="w-24 rounded-md border broder-gray-400"
              />
            </div>
            <div className="flex justify-end px-8 py-6">
              <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-6 ml-10 rounded-l-3xl rounded-r-3xl">
                ค้นหา
              </button>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}