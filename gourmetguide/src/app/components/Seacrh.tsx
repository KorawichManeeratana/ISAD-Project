import React, { Component } from 'react';

class Search extends Component {
  constructor(props : any) {
    super(props);
    
  }
  state = {
    searchQuery: ''
  };

  private async handleSearch(){
    console.log('Searching for:', this.state.searchQuery);
  };

  private async handleChange(e : any){
    this.setState({ searchQuery: e.target.value });
  };

  render() {
    return (
      <input
        type="text"
        placeholder="ค้นหาสูตรอาหาร"
        className="text-black w-96 px-4 py-2 rounded-l-3xl rounded-r-3xl border-gray-400px focus:outline-none focus:ring-2 focus:ring-yellow-500 "
        value={this.state.searchQuery}
        onChange={this.handleChange} />
    );
  }
};

export default Search;