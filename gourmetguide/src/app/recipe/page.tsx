"use client";
import React, { Component } from "react";
import SearchResultCard from "../components/SearchResultCard";
import Link from "next/link";
import Loading from "../loading";

type Data = {
  rep_id: number;
  rep_name: string;
  rep_dest: string;
  calories: number;
  rep_date: string;
  likes: number;
  rep_img: string;
  rep_time: string;
  rep_step: string;
  username: string;
};

export default class page extends Component<{ searchParams: any }> {
  state = {
    items: [],
    searchResult: "",
    isloading: true,
  };
  constructor(props: any) {
    super(props);
  }
  public setIsLoading(turn: boolean) {
    this.setState({
      isloading: turn,
    });
  }
  public setSearchResult(word: string) {
    this.setState({
      searchResult: word,
    });
  }

  public setItems(data: any) {
    this.setState({
      items: data,
    });
  }
  async componentDidUpdate(prevProps: Readonly<{ searchParams: any }>) {
    if (
      this.props.searchParams.searchResult !==
      prevProps.searchParams.searchResult
    ) {
      this.handleNormalSearch();
    }
  }

  async componentDidMount() {
    this.handleNormalSearch();
  }

  private async handleNormalSearch() {
    this.setIsLoading(true);
    let res = await fetch("http://localhost:3000/attractions/api_search/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        search: this.props.searchParams.searchResult,
      }),
    });
    let data: any = await res.json();
    console.log("data[0]:", data[0]);
    this.setItems(data[0]);
    this.setIsLoading(false);
  }

  private async handleSensitiveSearch() {
    this.setIsLoading(true);
    let res = await fetch("http://localhost:3000/attractions/api_search/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        search: this.props.searchParams.searchResult,
      }),
    });
    let data: any = await res.json();
    this.setItems(data[0]);
    this.setIsLoading(false);
  }

  private async performSearch(searchQuery: string | string[]) {
    this.setIsLoading(true);
    if (Array.isArray(searchQuery)) {
      this.handleNormalSearch();
    } else {
      this.handleSensitiveSearch();
    }
  }

  render() {
    return (
      <div className="bg-gray-200">
        {this.state.isloading && <Loading />}
        <div className="overflow-y-auto"></div> {/* scroll bar */}
        <div className="w-[90vw] min-h-[900px] flex-grow  m-auto border-20 pt-10 border-x-gray-400 bg-yellow-100 px-8">
          <div className="flex items-center justify-center mt-8">
            <svg
              className="bi bi-search mr-10 t"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="#FFB443"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
            </svg>
            <div>
              <div>
                <input
                  type="text"
                  placeholder="ค้นหาสูตรอาหาร"
                  className="search text-black w-96 px-4 py-2 rounded-l-3xl rounded-r-3xl border border-gray-400px focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  onChange={(e) => this.setSearchResult(e.target.value)}
                />
              </div>
            </div>
            <button
              onClick={() => this.handleNormalSearch()}
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-6 ml-10 rounded-l-3xl rounded-r-3xl"
            >
              <Link
                href={{
                  pathname: "/recipe",
                  query: {
                    searchResult: this.state.searchResult,
                  },
                }}
              >
                ยินยัน
              </Link>
            </button>
            <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-6 ml-10 rounded-l-3xl rounded-r-3xl">
              ค้นหาแบบละเอียด
            </button>
          </div>
          <div className="mt-4">
            <div className="flex justify-start items-start pt-10 pl-6">
              <h1 className="text-2xl text-gray-500">
                ผลการค้นหา "{this.props.searchParams.searchResult}"
              </h1>
            </div>
            <div className="flex justify-end items-end">
              <button className="bg-white hover:bg-yellow-600 text-yellow-800 font-medium py-2 px-6  rounded-l-3xl rounded-r-3xl">
                ค้นหาแบบละเอียด
              </button>
              <button className="bg-white hover:bg-yellow-600 text-yellow-800 font-medium py-2 px-6 ml-8 mr-28 rounded-l-3xl rounded-r-3xl">
                ค้นหาแบบละเอียด
              </button>
            </div>
          </div>
          {this.state.items && this.state.items.length > 0 ? ( // Check if items exists and is not empty
            this.state.items.map((attractions: any) => (
              <React.Fragment key={attractions.rep_id}>
                <div className="py-6 flex flex-col justify-center items-center">
                  <SearchResultCard
                    rep_name={attractions.rep_name}
                    name={attractions.username}
                    Img={attractions.rep_img}
                    userPFP="https://th.bing.com/th/id/OIP.rPXouxu-tJ0c9R3AKI6tCwHaEK?rs=1&pid=ImgDetMain"
                    descriptions={attractions.rep_des}
                    calories={attractions.calories}
                    cookTimes={attractions.rep_time}
                    likes={attractions.likes}
                  />
                </div>
              </React.Fragment>
            ))
          ) : (
            <div className="mt-10 self-center"> {/* Vertically center content */}
                <h1 className="text-center text-2xl">ไม่พบสูตรอาหารที่ต้องการ</h1> 
            </div>
          )}
        </div>
      </div>
    );
  }
}
