"use client";
import React from "react";
import PostTop1 from "./components/topRecommend/recipesTop1";
import PostTop2and3 from "./components/topRecommend/recpiesTop2-3";
import Footer from "./components/Footer";
import { SensitiveSearch } from "./components/Search/SensitiveSearch";
import Ddata from "./setest/data.json";
import { redirect } from "next/navigation";
import Link from "next/link";

// หน้า homepage หลักเลย
class Home extends React.Component {
  state = {
    sensitiveVisible: false,
    items: [],
    searchResult : "",
  };
  constructor(props: any) {
    super(props);
  }
  public setItems(data: any) {
    this.setState({
      items: data,
    });
  }

  public setSearchResult(word : string){
    this.setState({
      searchResult : word
    })
  }

  public setSensitiveVisible(turn: boolean) {
    this.setState({
      sensitiveVisible: turn,
    });
  }
  public handleClose() {
    this.setSensitiveVisible(false);
  }

  public async handleSearch(e: any) {
    e.preventDefault();
    let searchResult: any = document.querySelector(".search");
    this.setSearchResult(searchResult.value)
  }

  public handleSubmit = (e : any) => {
    e.preventDefault();
    location.assign(`http://localhost:3000/recipe?searchResult=${this.state.searchResult}`)
  };

  render() {
    return (
      <div className="font-kanit bg-gray-200">
        {this.state.sensitiveVisible && (
          <SensitiveSearch
            initialMin={100}
            initialMax={500}
            min={0}
            max={2000}
            step={10}
            Cap={1000}
            Visible={this.handleClose.bind(this)}
          />
        )}
        <div className="bg-grey-900 text-white" id="background">
          {" "}
          {/* รูปพื้นหลังในหน้า home หลัง search */}
          <div className="container mx-auto px-4 py-16">
            <div className="text-center">
              <h1
                className="text-amber-100 text-5xl font-bold mb-4"
                id="gourment"
              >
                GOURMET GUIDE
              </h1>
              <p className="text-lg text-gray-100">
                ค้นหาสูตรตามที่ใจคุณต้องการ
              </p>
            </div>
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
                  <form onSubmit={this.handleSubmit} ><input
                    type="text"
                    placeholder="ค้นหาสูตรอาหาร"
                    className="search text-black w-96 px-4 py-2 rounded-l-3xl rounded-r-3xl border border-gray-400px focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    onChange={(e) => this.handleSearch(e)}
                  /></form>
                  
                </div>
              </div>
              <button
                 className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-6 ml-10 rounded-l-3xl rounded-r-3xl"
              ><Link  href={{
                pathname: '/recipe',
                query: {
                  searchResult  : this.state.searchResult
                }
              }}>ยินยัน</Link>
              </button>
              <button
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-6 ml-10 rounded-l-3xl rounded-r-3xl"
                onClick={() => this.setSensitiveVisible(true)}
              >
                ค้นหาแบบละเอียด
              </button>
            </div>
          </div>
        </div>
        <div className="bg-white w-1920px py-10 text-white"></div>{" "}
        {/* พท.สีขาว */}
        <div className="overflow-y-auto"></div> {/* scroll bar */}
        <div className="w-[90vw] h-[100vh] m-auto border-20 border-x-gray-400 bg-yellow-100 px-8">
          {" "}
          {/* เนื้อหา */}
          <h1 className="text-yellow-950 text-3xl font-bold mb-4 pl-16 pt-16">
            เมนูยอดนิยม
          </h1>
          <div className="flex flex-center justify-center items-center space-x-8">
            <PostTop1
              rep_name="ก๋วยเตี๋ยวเรือ"
              Img="https://s359.kapook.com/pagebuilder/26fcc205-e197-4429-9b2e-2082dd3b7383.jpg"
            />
            <div className="flex flex-col p-6 space-y-14">
              <PostTop2and3
                rep_name="noob insi"
                Img="https://images.deliveryhero.io/image/fd-th/LH/lkhi-hero.jpg"
              />
              <PostTop2and3
                rep_name="kuy isad"
                Img="https://cdn.usarestaurants.info/assets/uploads/049ec03201bfbd5eb2edb23b3ee74d9d_-united-states-california-los-angeles-county-whittier-241880-raku-teriyaki-and-sushi-rollhtm.jpg"
              />
            </div>
          </div>
          <h1 className="text-xl text-gray-700 grid justify-end px-40 pt-6">
            ดูเพิ่มเตืม
          </h1>
        </div>
        <div className="bg-white w-1920px h-1680px py-10 text-white"></div>{" "}
        {/* พท.สีขาว */}
        <Footer />
        <div className="bg-white w-1920px h-1680px py-10 text-white"></div>{" "}
        {/* พท.สีขาว */}
      </div>
    );
  }
}
export default Home;
