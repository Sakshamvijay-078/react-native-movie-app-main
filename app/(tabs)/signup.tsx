import React, { useState } from "react";
import axios from "axios";

const SignupPage: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/signup", { name, email, password });
      alert("Signup successful! Please log in.");
      setName(""); setEmail(""); setPassword("");
      
    } catch (err) {
      setError("Signup failed, try again.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-white text-2xl font-semibold text-center">Sign Up</h2>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleSignup} className="mt-6">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-3 rounded bg-gray-800 text-white"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 mt-4 rounded bg-gray-800 text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 mt-4 rounded bg-gray-800 text-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="w-full bg-red-600 py-3 mt-6 rounded">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
