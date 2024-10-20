"use client";
import React from "react";
import PostTop1 from "./components/topRecommend/recipesTop1";
import PostTop2and3 from "./components/topRecommend/recpiesTop2-3";
import Footer from "./components/Footer";
import { SensitiveSearch } from "./components/Search/SensitiveSearch";
import { redirect } from "next/navigation";
import Link from "next/link";

// หน้า homepage หลักเลย
class Home extends React.Component {
  state : any = {
    sensitiveVisible: false,
    items: [],
    searchResult : "",
    top1id:"",
    top1name : "",
    top1pic : "",
    top2id:"",
    top2name : "",
    top2pic : "",
    top3id:"",
    top3name : "",
    top3pic : "",
  };
  constructor(props: any) {
    super(props);
  }
  public setItems(data: any) {
    this.setState({
      items: data,
    });
  }
  public setTop1ID(value : string){
    this.setState({
      top1id : value
    })
  }
  public setTop1Name(value : string){
    this.setState({
      top1name : value
    })
  }
  public setTop1Pic(value : string){
    this.setState({
      top1pic : value
    })
  }
  public setTop2ID(value : string){
    this.setState({
      top2id : value
    })
  }
  public setTop2Name(value : string){
    this.setState({
      top2name : value
    })
  }
  public setTop2Pic(value : string){
    this.setState({
      top2pic : value
    })
  }
  public setTop3ID(value : string){
    this.setState({
      top3id : value
    })
  }
  public setTop3Name(value : string){
    this.setState({
      top3name : value
    })
  }
  public setTop3Pic(value : string){
    this.setState({
      top3pic : value
    })
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

  public SearchQuery = (e : any) => {
    e.preventDefault();
    location.assign(`http://localhost:3000/recipe?searchResult=${this.state.searchResult}`)
  };

  componentDidMount(): void {
      this.getTrending();
  }

  public async getTrending(){
    try{
      let res = await fetch("http://localhost:3000/attractions/api_trendingRecipe/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          reo_id : "",
        }),
      });
        if(res.ok){
          let data = await res.json();
          console.log("data:", data)
          this.setItems(data);
          this.setTop1ID(this.state.items[0].rep_id)
          this.setTop1Name(this.state.items[0].rep_name)
          this.setTop1Pic(this.state.items[0].rep_img)
          this.setTop2ID(this.state.items[1].rep_id)
          this.setTop2Name(this.state.items[1].rep_name)
          this.setTop2Pic(this.state.items[1].rep_img)
          this.setTop3ID(this.state.items[2].rep_id)
          this.setTop3Name(this.state.items[2].rep_name)
          this.setTop3Pic(this.state.items[2].rep_img)
        }
      }
    catch(error){
      console.log("Error:", error)
    }
  }

  render() {
    console.log("items:", this.state.items)
    
    return (
      <div className="font-kanit bg-gray-200">
        {this.state.sensitiveVisible && (
          <SensitiveSearch
            initialMin={100}
            initialMax={500}
            min={0}
            max={2000}
            step={10}
            Cap={2000}
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
                  <form onSubmit={this.SearchQuery} ><input
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
              }}>ยืนยัน</Link>
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
            rep_id={this.state.top1id}
              rep_name={this.state.top1name}
              Img={this.state.top1pic}
            />
            <div className="flex flex-col p-6 space-y-14">
              <PostTop2and3
              rep_id={this.state.top2id}
                rep_name={this.state.top2name}
                Img={this.state.top2pic}
              />
              <PostTop2and3
              rep_id={this.state.top3id}
                rep_name={this.state.top3name}
                Img={this.state.top3pic}
              />
            </div>
          </div>
          <Link
                  href={{
                    pathname: "/recipe",
                    query: {
                      searchResult: "",
                    },
                  }}
                ><h1 className="text-xl text-gray-700 grid justify-end px-40 pt-6">
            ดูเพิ่มเติม
          </h1></Link>
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
