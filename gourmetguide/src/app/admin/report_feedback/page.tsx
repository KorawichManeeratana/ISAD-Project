'use client';
import React, { Component } from 'react';

export default class report_feedback extends Component {
  render() {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Manage Reports</h1>

        {/* Search bar aligned to the right */}
        <div className="mb-4 flex justify-end"> 
          <input 
            type="text"
            placeholder="ค้นหาผู้ใช้งาน" 
            className="px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" 
          />
          <button className="px-3 py-2 ml-2 rounded-md bg-gray-300 text-gray-700 hover:bg-gray-400 focus:outline-none focus:bg-gray-400">
            <i className="fas fa-search"></i>
          </button>
        </div>

        {/* Yellow box with specified dimensions */}
        <div 
          className="overflow-x-auto bg-yellow-200 p-4 rounded-md mb-4"
          style={{ width: '1600px', height: '900px' }} // Setting width and height to 1820x650
        >
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Problem</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Report Date</th>
              </tr>
            </thead>
            <tbody>
              {/* Empty table body as requested */}
            </tbody>
          </table>

          {/* Pagination buttons aligned to the right */}
          <div className="flex justify-end mt-4">
            <button 
              className="px-3 py-2 rounded-l-md bg-gray-300 text-gray-700 hover:bg-gray-400 focus:outline-none focus:bg-gray-400" 
              disabled>
              Previous
            </button>
            <button 
              className="px-3 py-2 hover:bg-gray-400 focus:outline-none focus:bg-gray-400 bg-blue-500 text-white">
              1
            </button>
            <button 
              className="px-3 py-2 hover:bg-gray-400 focus:outline-none focus:bg-gray-400 bg-gray-300 text-gray-700">
              2
            </button>
            <button className="px-3 py-2 bg-gray-300 text-gray-700">...</button>
            <button 
              className="px-3 py-2 hover:bg-gray-400 focus:outline-none focus:bg-gray-400 bg-gray-300 text-gray-700">
              20
            </button>
            <button 
              className="px-3 py-2 rounded-r-md bg-gray-300 text-gray-700 hover:bg-gray-400 focus:outline-none focus:bg-gray-400">
              Next
            </button>
          </div>
        </div>
      </div>
    );
  };
};
