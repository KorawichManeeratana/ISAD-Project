"use client";
import React, { Component } from "react";
import SearchResultCard from "../components/SearchResultCard";
import Link from "next/link";
import Loading from "../loading";
import { SensitiveSearch } from "../components/Search/SensitiveSearch";
import { jwtDecode } from "jwt-decode";

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
  state : any = {
    isCalculateOpen: false,
    sensitiveVisible: false,
    items: [],
    searchResult: "",
    isloading: false,
    calculate: new Array<{
      rep_name: string;
      caloreis: number;
    }>(),
    sum: 0,
    cookieValue: null,
  };
  constructor(props: any) {
    super(props);
  }
  public setCalculate(data: { rep_name: string; caloreis: number }[]) {
    this.setState({
      calculate: data,
    });
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
  public setSensitiveVisible(turn: boolean) {
    this.setState({
      sensitiveVisible: turn,
    });
  }
  public setItems(data: any) {
    this.setState({
      items: data,
    });
  }
  public setCookieValue(value : any){
    this.setState({
      cookieValue : value
    })
  }
  getCookie(name: string): string | null {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  getCookieValue() {
    const cookieValue = this.getCookie('token');
    if (cookieValue) {
      try {
        const decodedToken = jwtDecode(cookieValue); // Decode the JWT
        console.log("decodeData:", decodedToken);
        this.setCookieValue(decodedToken); // Update state with decoded data
      } catch (error) {
        console.error("Error decoding JWT:", error);
      }
    }
  }

  public addCalculate(sugyhang: { rep_name: string; caloreis: number }) {
    this.setCalculate([...this.state.calculate, sugyhang]);
    console.log("calculate:", this.state.calculate);
  }

  async componentDidUpdate(prevProps: Readonly<{ searchParams: any }>) {
    if (
      JSON.stringify(this.props.searchParams) !==
      JSON.stringify(prevProps.searchParams)
    ) {
      this.handleSearch();
    }
  }

  async componentDidMount() {
    console.log("searhParams:", JSON.stringify(this.props.searchParams));
    this.handleSearch();
    this.getCookieValue();
  }

  private async handleSearch() {
    this.setIsLoading(true);
    let res = await fetch("http://localhost:3000/attractions/api_search/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        search: this.props.searchParams.searchResult,
        minValue: this.props.searchParams.minValue,
        maxValue: this.props.searchParams.maxValue,
        minTime: this.props.searchParams.minTime,
        maxTime: this.props.searchParams.maxTime,
      }),
    });
    let data: any = await res.json();
    console.log("data:", data);
    this.setItems(data);
    this.setIsLoading(false);
  }

  public handleClose() {
    this.setSensitiveVisible(false);
  }

  public startcalculate() {
    let sum = 0;
    this.state.calculate.forEach((value : any) => {
      sum += value.caloreis;
    });
    this.setState({ sum: sum });
  }

  public clear() {
    this.setState({
      calculate: [],
      sum: 0,
    });
  }
  public setIsCalculateOpen(turn: boolean) {
    this.setState({
      isCalculateOpen: turn,
    });
  }

  render() {
    const searcherac_id = this.state.cookieValue ? this.state.cookieValue.id : null;
    console.log("recipeCookies:", this.state.cookieValue)
    return (
      <div className="bg-gray-200">
        {this.state.isloading && <Loading />}
        {this.state.sensitiveVisible && (
          <SensitiveSearch
            initialMin={100}
            initialMax={500}
            min={0}
            max={1000}
            step={10}
            Cap={1000}
            Visible={this.handleClose.bind(this)}
          />
        )}
        <div className="overflow-y-auto"></div> {/* scroll bar */}
        <div className="w-[90vw] min-h-[900px] flex-grow  m-auto border-20 pt-10 border-x-gray-400 bg-yellow-100 px-8">
          {this.state.isCalculateOpen && (
            <div className="w-[25vw] h-[60vh] bg-white fixed right-0 rounded-l-lg shadow-xl p-2 z-10">
              {/*กรองคำนวณแคลอรี่ */}
              <button
                className="text-bold absolute right-0 mr-2"
                onClick={() => {
                  this.setIsCalculateOpen(false);
                }}
              >
                {" "}
                X{" "}
              </button>
              <h1 className=" border-b-2 border-black font-kanit text-center text-2xl ">
                คำนวณแคลอรี่
              </h1>
              <div className="overflow-auto w-[100%] h-[75%] border mt-4">
                {this.state.calculate.map((value : any, index : number) => (
                  <React.Fragment key={index}>
                    <div className="flex justify-between p-2">
                      <p>{value.rep_name}</p>
                      <p>{value.caloreis}</p>
                    </div>
                  </React.Fragment>
                ))}
              </div>
              <div className="flex justify-between items-center h-[15%] p-2">
                <p className="text-bold font-kanit text-lg">
                  ผลการคำนวณ: {this.state.sum}
                </p>
                <div className="flex gap-3">
                  <div className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-6 rounded-l-3xl rounded-r-3xl">
                    <button
                      onClick={this.startcalculate.bind(this)}
                      className=""
                    >
                      ยืนยัน
                    </button>
                  </div>
                  <div className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-6 rounded-l-3xl rounded-r-3xl">
                    <button onClick={this.clear.bind(this)} className="">
                      ล้างรายการ
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
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
              onClick={() => this.handleSearch()}
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
            <button
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-6 ml-10 rounded-l-3xl rounded-r-3xl"
              onClick={() => this.setSensitiveVisible(true)}
            >
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
              <button
                onClick={() => {
                  this.setIsCalculateOpen(true);
                }}
                className="bg-white hover:bg-yellow-600 text-yellow-800 font-medium py-2 px-6  rounded-l-3xl rounded-r-3xl"
              >
                คำนวณแคลอรี่
              </button>
              <button onClick={() => location.assign("http://localhost:3000/createpost")} className="bg-white hover:bg-yellow-600 text-yellow-800 font-medium py-2 px-6 ml-8 mr-28 rounded-l-3xl rounded-r-3xl">
                สร้างสูตรอาหาร
              </button>
            </div>
          </div>
          {this.state.items && this.state.items.length > 0 ? ( // Check if items exists and is not empty
            this.state.items.map((attractions: any) => (
              <React.Fragment key={attractions.rep_id}>
                <div className="py-6 flex flex-col justify-center items-center">
                  <SearchResultCard
                    ac_id={attractions.ac_id}
                    rep_id={attractions.rep_id}
                    rep_name={attractions.rep_name}
                    name={attractions.username}
                    Img={attractions.rep_img}
                    userPFP={attractions.userPFP}
                    descriptions={attractions.rep_des}
                    calories={attractions.calories}
                    cookTimes={attractions.rep_time}
                    likes={attractions.likes}
                    calculatefunction={this.addCalculate.bind(this)}
                    showButton={this.state.isCalculateOpen}
                    rep_date = {attractions.rep_date}
                    searcherac_id = {searcherac_id}
                  />
                </div>
              </React.Fragment>
            ))
          ) : (
            <div className="mt-10 self-center">
              {" "}
              {/* Vertically center content */}
              <h1 className="text-center text-2xl">ไม่พบสูตรอาหารที่ต้องการ</h1>
            </div>
          )}
        </div>
      </div>
    );
  }
}
