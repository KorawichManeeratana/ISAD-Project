"use client"
import React, { useState } from 'react';

const Seacrh: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
  
const handleSearch = () => {
        console.log('Searching for:', searchQuery);
    };

  return (
    <input
        type="text"
        placeholder="ค้นหาสูตรอาหาร"
        className="text-black w-96 px-4 py-2 rounded-l-3xl rounded-r-3xl border-gray-400px focus:outline-none focus:ring-2 focus:ring-yellow-500 "
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}/>
  );
};

export default Seacrh;