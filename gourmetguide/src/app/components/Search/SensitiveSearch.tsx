"use client";
import React, { Component } from "react";
import Modal from "../modal";
import Link from "next/link";

interface SensitiveSearchProps {
  initialMin: number;
  initialMax: number;
  min?: number;        // Make props optional
  max?: number;
  step?: number;
  Cap?: number;
  Visible: () => void;
}

export class SensitiveSearch extends Component<SensitiveSearchProps, { minValue: number; maxValue: number, searchTags: string[] }> {
  progressRef = React.createRef<HTMLDivElement>(); // Simplify ref creation
  
  state = {
    searchTags: [],  // Initialize as an empty array
    minValue: this.props.initialMin,
    maxValue: this.props.initialMax,
  };

  constructor(props: SensitiveSearchProps) {
    super(props);
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
    this.props.Visible();
  };

  handleMax = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.updateMaxValue(parseInt(e.target.value, 10));
  };

  handleMin = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.updateMinValue(parseInt(e.target.value, 10));
  };

  updateMaxValue = (newMaxValue: number) => {
    const  minValue  = this.state.minValue;
    const { max = 1000, Cap = 0, min = 0 } = this.props; // Provide default props

    newMaxValue = isNaN(newMaxValue) ? minValue : newMaxValue;
    newMaxValue = Math.min(newMaxValue, max);
    newMaxValue = Math.min(newMaxValue, minValue + Cap);
    newMaxValue = Math.max(newMaxValue, min);

    this.setState({ maxValue: Math.max(newMaxValue, minValue) }); // Use functional setState
  };


  updateMinValue = (newMinValue: number) => {
    const  maxValue  = this.state.maxValue;
    const { min = 0, Cap = 0, max = 1000 } = this.props; // Provide default props

    newMinValue = isNaN(newMinValue) ? maxValue : newMinValue;
    newMinValue = Math.max(newMinValue, min);
    newMinValue = Math.max(newMinValue, maxValue - Cap);
    newMinValue = Math.min(newMinValue, max);

    this.setState({ minValue: Math.min(newMinValue, maxValue) }); // Use functional setState
  };
  
  handleSummitSearchTag = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission
    console.log("SearchTag:", this.state.searchTags)
    const form = e.currentTarget;
    const inputElement = form.elements.namedItem("searchInput") as HTMLInputElement; // Give a name to the input
    const newTag = inputElement.value.trim();// Check if a tag is empty

    if (newTag) {
      this.setState((prevState) => ({
        searchTags: [...prevState.searchTags, newTag], // Add new tag to the array
      }));
      inputElement.value = "";  // Clear the input field after submission
    }
  };


  render() {
    const { min = 0, max = 1000, step = 1 } = this.props; // Default props in render too
    const { minValue, maxValue } = this.state;

    return (
      <div>
        <Modal isVisible={true} onClose={this.handleCloseModal}>
          <div className="w-[600px] h-[500px] bg-white rounded-3xl">
          <div className="flex pt-8 justify-center items-center">
              <form onSubmit={this.handleSummitSearchTag}>
                <input
                  type="text"
                  name="searchInput"
                  placeholder="ค้นหาสูตรอาหาร"
                  className="search text-black w-96 px-4 py-2 rounded-l-3xl rounded-r-3xl border border-gray-400px focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                <button
                  type="submit" // Make this a submit button
                  className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-6 ml-10 rounded-l-3xl rounded-r-3xl"
                >
                  ค้นหา
                </button>
              </form>
            </div>

            <div className="flex justify-center items-center pt-6">
            <div className="w-[500px] h-[100px] border border-x-transparent border-b-gray-600 rounded-md">
                {this.state.searchTags.map((tag, index) => (
                  <span
                    key={index}
                    className="mr-2 mt-2 bg-gray-200 rounded-md px-2 py-1 text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-6">
              <span className="text-sm text-gray-500 px-6">จำนวนแคลอรี่</span>
            </div>
            <div className="flex justify-center items-center space-x-8">
              <span className="p-2 font-semibold"> Min</span>
              <input
                onChange={this.handleMin} // Use handleMin here
                type="number"
                value={this.state.minValue}
                className="w-24 rounded-md border broder-gray-400"
              />
              <div className="ml-2 font-semibold text-lg"> - </div>
              <span className="p-2 font-semibold"> Max</span>
              <input
                onChange={this.handleMax} // Use handleMax here
                type="number"
                value={this.state.maxValue}
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
                  className=" cursor-pointer range-min absolute w-full -top1 h-1 bg-transparent appearance-none pointer-events-none"
                />

                <input
                   onChange={this.handleMax}
                  type="range"
                  value={maxValue}
                  min={min}
                  step={step}
                  max={max}
                  className=" cursor-pointer range-max absolute w-full -top1 h-1 bg-transparent appearance-none pointer-events-none"
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
              <button className="cursor-pointer bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-6 ml-10 rounded-l-3xl rounded-r-3xl">
              <Link  href={{
                pathname: '/recipe',
                query: {
                  searchResult  : this.state.searchTags.join(",")
                }
              }}>ค้นหา</Link>
              </button>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}