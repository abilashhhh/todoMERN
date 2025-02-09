/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import PasswordInput from "../../components/Input/PasswordInput";
import { Link } from "react-router-dom";
import { validateEmail, validatePassword } from "../../utils/helper";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async e => {
    e.preventDefault();

    if (!name) {
      setError("Please enter your name");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!password) {
      setError("Please enter the password");
      return;
    }

    if (!validatePassword(password)) {
      setError("Please enter a strong password");
      return;
    }

    setError("");

    // signup api call
  };

  return (
    <>
      <Navbar />

      <div className="flex items-center justify-center mt-28">
        <div className="w-96 border rounded bg-white px-7 py-10">
          <form onSubmit={handleSignup}>
            <h4 className="text-2xl mb-7"> SignUp </h4>

            <input
              type="text"
              placeholder="Name"
              className="input-box"
              value={name}
              onChange={e => setName(e.target.value)}
            />

            <input
              type="text"
              placeholder="Email"
              className="input-box"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />

            <PasswordInput
              value={password}
              onChange={e => setPassword(e.target.value)}
            />

            {error && <p className="text-red-500 text-xs pb-1">{error}</p>}

            <button type="submit" className="btn-primary">
              SignUp
            </button>

            <p className="text-sm text-center mt-4">
              Already have an accoount?{""}
              <Link
                to="/login"
                className="font-medium text-primary underline ml-3">
                Login here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;