/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

const SearchBar = ({ value, userInfo, onChange, handleSearch, onClearSearch }) => {
  useEffect(() => {
    if (value) {
      handleSearch();
    } else {
      onClearSearch();
    }
  }, [value]);

  return (
    userInfo && (
      <div className="w-80 flex items-center px-4 bg-slate-100 rounded-md ">
        <input
          type="text"
          className="w-full text-xs bg-transparent py-[11px] outline-none"
          value={value}
          onChange={onChange}
          placeholder="Search Notes"
        />

        {value && (
          <IoMdClose
            className="text-xl text-slate-500 mr-3 cursor-pointer hover:text-black"
            onClick={onClearSearch}
          />
        )}

        <FaMagnifyingGlass className="text-slate-400 cursor-pointer hover:text-black" />
      </div>
    )
  );
};

export default SearchBar;