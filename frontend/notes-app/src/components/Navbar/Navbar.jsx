/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { ListTodo } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import ProfileInfo from "../Cards/ProfileInfo";
import SearchBar from "../SearchBar/SearchBar";
import { useState } from "react";

const Navbar = ({ userInfo, onSearchNote, handleClearSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleSearch = () => {
    if (searchQuery) {
      onSearchNote(searchQuery);
    }
  };

  const onClearSearch = () => {
    setSearchQuery("");
    handleClearSearch()
  };

  return (
    <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow">
      <Link to="/dashboard">
        <h2 className="text-xl flex gap-2 align-middle justify-center font-medium text-black py-2">
          <ListTodo className="w-8 h-8 text-black-500" />
          To-Do
        </h2>
      </Link>

      <SearchBar
       userInfo={userInfo}
        value={searchQuery}
        onChange={({ target }) => {
          setSearchQuery(target.value);
        }}
        handleSearch={handleSearch}
        onClearSearch={onClearSearch}
      />

      <ProfileInfo  userInfo={userInfo} onLogout={onLogout} />
    </div>
  );
};

export default Navbar;
